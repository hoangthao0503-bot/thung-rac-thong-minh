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

		// GET /api/bins - Retrieve all bin data
		if (url.pathname === '/api/bins' && request.method === 'GET') {
			const data = await env.ECOBIN_KV.get('bins_data');
			return new Response(data || '[]', {
				headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
			});
		}

		// POST /api/update - Update bin status
		if (url.pathname === '/api/update' && request.method === 'POST') {
			try {
				const body = await request.json();
				// In a real app, we would validate and update the specific bin.
				// For this prototype, we'll just save the whole array sent from dashboard.
				await env.ECOBIN_KV.put('bins_data', JSON.stringify(body));
				return new Response(JSON.stringify({ success: true }), {
					headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
				});
			} catch (err) {
				return new Response('Invalid JSON', { status: 400, headers: CORS_HEADERS });
			}
		}

		return new Response('API Route Not Found', { status: 404, headers: CORS_HEADERS });
	},
} satisfies ExportedHandler<Env>;
