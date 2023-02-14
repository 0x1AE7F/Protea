import '$lib/supabaseClient';
import { getCurrentUserSession } from '$lib/supabaseClient';
// import { getCurrentUserSession } from '$lib/supabaseClient';

import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	//if (event.url.pathname.startsWith('/dashboard')) {
	//	const userLoggedIn = getCurrentUserSession().then((result) => {
	//		return result.data.session == null ? false : true;
	//	});
	//	console.log(userLoggedIn);
	//	console.log(event.request.url);
	//
	//	if (!userLoggedIn) {
	//		return Response.redirect(`${event.url.origin}/login`, 301);
	//	}
	//}

	const response = await resolve(event);
	return response;
}) satisfies Handle;

// TODO: FINISH THIS
