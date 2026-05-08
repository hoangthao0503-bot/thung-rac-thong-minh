/**
 * EcoBin API Worker
 * Handles bin status updates and data retrieval.
 */

export interface Env {
	ECOBIN_KV: KVNamespace;
	RESEND_API_KEY?: string; // Cần thiết lập trong Dashboard Cloudflare hoặc Wrangler Secret
}

async function sendEmailNotification(env: Env, binId: string, location: string) {
	if (!env.RESEND_API_KEY) return;

	try {
		await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${env.RESEND_API_KEY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				from: 'EcoBin <onboarding@resend.dev>',
				to: ['admin@example.com'], // Thay bằng email nhận thông báo của bạn
				subject: `⚠️ CẢNH BÁO: Thùng rác ${binId} đã đầy!`,
				html: `
					<h2>Cảnh báo hệ thống EcoBin</h2>
					<p>Thùng rác mã số <strong>${binId}</strong> tại địa điểm <strong>${location}</strong> đã đạt mức giới hạn (100%).</p>
					<p>Vui lòng điều phối đội thu gom xử lý sớm.</p>
					<hr>
					<p><small>Đây là email tự động từ hệ thống quản lý EcoBin.</small></p>
				`,
			}),
		});
	} catch (err) {
		console.error('Lỗi gửi email:', err);
	}
}

const CORS_HEADERS = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		// Handle CORS preflight
		if (request.method === 'OPTIONS') {
			return new Response(null, { headers: CORS_HEADERS });
		}

		const url = new URL(request.url);

		// GET /api/stats - Retrieve all data (bins + alerts)
		if (url.pathname === '/api/stats' && request.method === 'GET') {
			const bins = await env.ECOBIN_KV.get('bins_data');
			const alerts = await env.ECOBIN_KV.get('alerts_data');
			return new Response(JSON.stringify({
				bins: JSON.parse(bins || '[]'),
				alerts: JSON.parse(alerts || '[]')
			}), {
				headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
			});
		}

		// POST /api/update - Update bin status & handle alerts
		if (url.pathname === '/api/update' && request.method === 'POST') {
			try {
				const body = await request.json();
				await env.ECOBIN_KV.put('bins_data', JSON.stringify(body));
				
				// Generate alerts for full bins
				const fullBins = body.filter((b: any) => b.status === 'full');
				if (fullBins.length > 0) {
					const existingAlerts = JSON.parse(await env.ECOBIN_KV.get('alerts_data') || '[]');
					
					for (const b of fullBins) {
						// Kiểm tra xem đã có cảnh báo gần đây cho thùng này chưa để tránh gửi email liên tục
						const hasRecentAlert = existingAlerts.some((a: any) => a.binId === b.id && (Date.now() - new Date(a.time).getTime() < 3600000)); // 1 giờ
						
						if (!hasRecentAlert) {
							ctx.waitUntil(sendEmailNotification(env, b.id, b.location));
						}
					}

					const newAlerts = fullBins.map((b: any) => ({
						id: `ALERT-${Date.now()}-${b.id}`,
						binId: b.id,
						message: `Thùng rác ${b.id} tại ${b.location} đã đầy (${b.fill}%).`,
						time: new Date().toISOString(),
						type: 'critical'
					}));
					
					const updatedAlerts = [...newAlerts, ...existingAlerts].slice(0, 20);
					await env.ECOBIN_KV.put('alerts_data', JSON.stringify(updatedAlerts));
				}

				return new Response(JSON.stringify({ success: true }), {
					headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
				});
			} catch (err) {
				return new Response('Error processing update', { status: 400, headers: CORS_HEADERS });
			}
		}

		return new Response('API Route Not Found', { status: 404, headers: CORS_HEADERS });
	},
} satisfies ExportedHandler<Env>;
