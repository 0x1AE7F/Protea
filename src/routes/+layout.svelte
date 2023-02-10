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
	// TODO: Fix this to work even when supabase itself is not exported
</script>

<slot />
