import { goto } from '$app/navigation';
import { logOutUser } from '$lib/supabaseClient';

// TODO: Create login
logOutUser();
goto('/login');
