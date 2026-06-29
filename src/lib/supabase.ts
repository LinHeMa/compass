import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import ws from 'ws';

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
	auth: {
		persistSession: false
	},
	// 👈 餵給它 Node.js 環境需要的 WebSocket 傳輸層
	realtime: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		transport: ws as any
	}
});
