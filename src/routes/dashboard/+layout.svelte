<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../../app.postcss';

	import { AppShell, AppRail, AppBar, AppRailTile, Avatar } from '@skeletonlabs/skeleton';

	import { writable, type Writable } from 'svelte/store';
	import { logOutUser } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';
	const storeValue: Writable<number> = writable(1);
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<Avatar src="/Logo_IconOnly.png" width="w-12" />
			</svelte:fragment>
			<ol class="breadcrumb">
				<li class="crumb text-base md:text-2xl font-bold"><a href="/">Protea</a></li>
				<li class="crumb-separator" aria-hidden>&rsaquo;</li>
				<li class="crumb text-base md:text-2xl"><a href="/dashboard">Dashboard</a></li>
			</ol>
			<svelte:fragment slot="trail">
				<button
					class="btn btn-filled-tertiary btn-base"
					on:click|once={() => {
						logOutUser();
						goto('/login');
					}}
				>
					<img src="/icons/logout.svg" class="" alt="Logout" />
				</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<AppRail selected={storeValue}>
			<AppRailTile tag="a" href="/dashboard">
				<img src="/icons/home.svg" class="svg-white" alt="Home" />
			</AppRailTile>
			<AppRailTile tag="a" href="/dashboard/email">
				<img src="/icons/inbox.svg" class="svg-white" alt="E-Mail" />
			</AppRailTile>
			<svelte:fragment slot="trail">
				<AppRailTile tag="a" href="/dashboard/settings">
					<img src="/icons/settings.svg" class="svg-white" alt="Settings" />
				</AppRailTile>
			</svelte:fragment>
		</AppRail>
	</svelte:fragment>
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
</AppShell>
