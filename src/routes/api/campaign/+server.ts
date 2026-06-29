import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/supabase';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { campaignName, targetEmails } = await request.json();

		if (!campaignName || !targetEmails)
			return json(
				{
					success: false,
					error: 'Missing required fields'
				},
				{ status: 400 }
			);
		const emailArray = targetEmails
			.split('\n')
			.map((email: string) => email.trim())
			.filter((email: string) => email.length > 0);

		const { error } = await supabase.from('campaigns').insert({
			name: campaignName,
			emails_count: emailArray.length
		});

		if (error) throw error;

		return json({
			success: true,
			message: 'Campaign processed successfully',
			processedCount: emailArray.length
		});
	} catch (error) {
		console.error('API Error:', error);
		return json({ success: false, error: 'Internal Server Error' }, { status: 500 });
	}
};
