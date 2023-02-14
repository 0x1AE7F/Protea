import type { LayoutLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { getCurrentUserSession } from '$lib/supabaseClient';
import { env } from '$env/dynamic/public';

async function getTranslations(): Promise<object> {
	let preferredLang = '';
	return getCurrentUserSession().then((result) => {
		if (result.data.session != null) {
			// TODO: Change this from fallback to preferredLang from user session
			// result.data.session.preferredLang
			preferredLang = env.PUBLIC_FALLBACK_LANGUAGE ?? 'en_US';
		} else {
			// Falling back to en_US when the defined fallback language is missing
			preferredLang = env.PUBLIC_FALLBACK_LANGUAGE ?? 'en_US';
		}
		return import(`$lib/lang/${preferredLang}.json`);
	});
}

export const load: LayoutLoad = async (event) => {
	const { session } = await getSupabase(event);
	const translations = await getTranslations();
	return { session, translations };
};
