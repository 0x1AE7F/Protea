import { createClient } from '@supabase/auth-helpers-sveltekit';
import { env } from '$env/dynamic/public';
import type { AuthError } from '@supabase/supabase-js';

const supabase = createClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ANON_KEY);

export async function logOutUser(): Promise<boolean> {
	const { error } = await supabase.auth.signOut();
	return error ? false : true;
}

export async function loginUser(email: string, password: string): Promise<AuthError | null> {
	const { error } = await supabase.auth.signInWithPassword({
		email: email,
		password: password
	});
	return error;
}

export async function userLoggedIn() {
	return await supabase.auth.getSession();
}

export async function createUser(
	email: string,
	password: string,
	name: string,
	username: string
): Promise<boolean> {
	const { error } = await supabase.auth.signUp({
		email: email,
		password: password,
		options: {
			data: {
				username: username,
				full_name: name
			}
		}
	});
	return error ? false : true;
}

export async function updateUser(userID: string, data: object): Promise<boolean> {
	console.log(userID, data);
	const { error } = await supabase.from('profiles').update(data).match({ id: userID });
	return error ? false : true;
}

export async function getUsers(): Promise<object> {
	const { data, error } = await supabase.from('profiles').select('*');
	if (error) {
		return {};
	}
	return data;
}
