<script lang="ts">
	//	import { supabase } from '$lib/supabaseClient';
	//	import { invalidate } from '$app/navigation';
	//	import { onMount } from 'svelte';
	//
	//	onMount(() => {
	//		const {
	//			data: { subscription }
	//		} = supabase.auth.onAuthStateChange(() => {
	//			invalidate('supabase:auth');
	//		});
	//
	//		return () => {
	//			subscription.unsubscribe();
	//		};
	//	});
	//
	// INFO: Fix this to work even when supabase itself is not exported
	// INFO: This is probably not required anymore
	// TODO: Find out what this is actually used for
</script>

<slot />
