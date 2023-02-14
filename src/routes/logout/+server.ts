import { goto } from '$app/navigation';
import { logOutUser } from '$lib/supabaseClient';

logOutUser();
goto('/login');
