//import { supabase } from '$lib/supabaseClient';

import { getUsers } from '$lib/supabaseClient';

//
export async function load() {
	return {
		users: getUsers()
	};
}
