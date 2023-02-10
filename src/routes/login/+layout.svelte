<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../../app.postcss';
	import { AppShell, AppBar, Avatar } from '@skeletonlabs/skeleton';
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
				<li class="crumb text-base md:text-2xl"><a href="/login">Login</a></li>
			</ol>
		</AppBar>
	</svelte:fragment>

	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
</AppShell>
