/**
 * EcoBin API Worker
 * Handles bin status updates and data retrieval.
 */

export interface Env {
	ECOBIN_KV: KVNamespace;
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
					const newAlerts = fullBins.map((b: any) => ({
						id: `ALERT-${Date.now()}-${b.id}`,
						binId: b.id,
						message: `Thùng rác ${b.id} tại ${b.location} đã đầy (${b.fill}%).`,
						time: new Date().toISOString(),
						type: 'critical'
					}));
					// Keep only latest 20 alerts
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
