<script lang="ts">
	import { goto } from '$app/navigation';
	import { focusTrap } from '$lib/actions/FocusTrap/focusTrap';
	import { page } from '$app/stores';
	import { getCurrentUserSession, loginUser } from '$lib/supabaseClient';

	getCurrentUserSession().then((response) => {
		if (response.data.session != null) {
			goto('/dashboard');
		}
	});

	// TODO: Find some way to stop typescript from crying about object properties

	let username = '';
	let password = '';
	let loading = false;
	let loginFailed = false;
	export let data: object;

	function handleLogin() {
		loading = true;
		loginUser(username, password).then((error) => {
			if (error != null) {
				loginFailed = true;
				loading = false;
				return;
			}
			loading = false;
			// goto('/dashboard')
			return;
		});
	}
</script>

<div class="p-10 justify-center items-center">
	<section class="card space-y-4">
		<form
			class="border border-surface-500 p-4 space-y-4 rounded-container-token"
			use:focusTrap={true}
			on:submit|preventDefault={() => {
				handleLogin();
			}}
		>
			<h1 class="crumb text-xs sm:text-2xl font-bold">{data.translations.login.login_prompt}</h1>

			<label>
				<span>{data.translations.login.label_username_email}</span>
				{#if loginFailed}
					<input
						type="text"
						class="border !border-primary-500 !text-error-500"
						placeholder="{data.translations.login.label_username_email}..."
						bind:value={username}
					/>
				{:else}
					<input
						type="text"
						placeholder="{data.translations.login.label_username_email}..."
						bind:value={username}
					/>
				{/if}
			</label>
			<label>
				<span>{data.translations.login.label_password}</span>
				{#if loginFailed}
					<input
						type="password"
						class="border !border-primary-500 !text-error-500"
						placeholder="{data.translations.login.label_password}..."
						bind:value={password}
					/>
				{:else}
					<input
						type="password"
						placeholder="{data.translations.login.label_password}..."
						bind:value={password}
					/>
				{/if}
			</label>
			<button class="btn btn-filled-primary" type="submit" disabled={loading}>
				{#if loading}
					{data.translations.login.btn_login_loading}
				{:else}
					{data.translations.login.btn_login}
				{/if}
				<!-- svelte-ignore component-name-lowercase -->
				<space />
				<img src="/icons/login.svg" class="svg-white" alt="Login Icon" />
			</button>
		</form>
	</section>
</div>
