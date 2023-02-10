<script lang="ts">
	import { goto } from '$app/navigation';
	import { focusTrap } from '$lib/actions/FocusTrap/focusTrap';
	import { page } from '$app/stores';
	import { loginUser, userLoggedIn } from '$lib/supabaseClient';

	// TODO: Rember users choosen lang
	import translations from '$lib/lang/en_US/login.json';

	userLoggedIn().then((response) => {
		if (response.data.session != null) {
			goto('/dashboard');
		}
	});

	let username = '';
	let password = '';
	let loading = false;
	let loginFailed = false;

	function handleLogin() {
		loading = true;
		let error;
		loginUser(username, password).then((error) => {
			console.log(error);
			console.log($page.data.session);
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
			<h1 class="crumb text-xs sm:text-2xl font-bold">{translations.login_prompt}</h1>

			<label>
				<span>{translations.label_username_email}</span>
				{#if loginFailed}
					<input
						type="text"
						class="border !border-primary-500 !text-error-500"
						placeholder="{translations.label_username_email}..."
						bind:value={username}
					/>
				{:else}
					<input
						type="text"
						placeholder="{translations.label_username_email}..."
						bind:value={username}
					/>
				{/if}
			</label>
			<label>
				<span>{translations.label_password}</span>
				{#if loginFailed}
					<input
						type="password"
						class="border !border-primary-500 !text-error-500"
						placeholder="{translations.label_password}..."
						bind:value={password}
					/>
				{:else}
					<input
						type="password"
						placeholder="{translations.label_password}..."
						bind:value={password}
					/>
				{/if}
			</label>
			<button class="btn btn-filled-primary" type="submit" disabled={loading}>
				{#if loading}
					{translations.btn_login_loading}
				{:else}
					{translations.btn_login}
				{/if}
				<!-- svelte-ignore component-name-lowercase -->
				<space />
				<img src="/icons/login.svg" class="svg-white" alt="Login Icon" />
			</button>
		</form>
	</section>
</div>
