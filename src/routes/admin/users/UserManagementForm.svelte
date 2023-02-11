<script lang="ts">
	import { env } from '$env/dynamic/public';
	//import { updateUser } from '$lib/supabaseClient';
	export let parent: any;

	import translations from '$lib/lang/en_US/userManagementForm.json';

	import { modalStore } from '@skeletonlabs/skeleton';
	import { createUser } from '$lib/supabaseClient';

	// TODO: Add input checking

	let name = '';
	let username = '';
	let tempPasswd = '';
	let editingUser = false;
	let userID = '';

	let wrongUsername = false;
	let wrongFullName = false;

	if ($modalStore[0]) {
		name = $modalStore[0].meta?.name;
		username = $modalStore[0].meta?.username;
		editingUser = $modalStore[0].meta?.editingUser;
		userID = $modalStore[0].meta?.userID;
	}

	if (!editingUser) {
		const selection = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%*()-_!';
		for (let i = 0; i < 8; i++) {
			// Math.random() is a security flaw
			// TODO: Find a different way to generate a temporary password
			let randnum = Math.random() * selection.length;
			tempPasswd += selection.substring(randnum, randnum + 1);
		}
	}
	function onFormSubmit(): void {
		// Checking if username is bigger than one char
		username.trim().length <= 1 ? (wrongUsername = true) : (wrongUsername = false);
		username.trim().length <= 1 ? (wrongFullName = true) : (wrongFullName = false);

		if (wrongFullName || wrongUsername) {
			return;
		}

		if ($modalStore[0].response)
			$modalStore[0].response({ name: name, username: username, tempPasswd: tempPasswd });
		if (!editingUser) {
			createUser(username + '@' + env.PUBLIC_EMAIL_DOMAIN, tempPasswd, name, username).then(
				(result) => {
					console.log(result);
				}
			);
		} else {
			// TODO: Update current user profile with new data
			return;
		}
		modalStore.close();
	}
	console.log(userID);
</script>

<div class="modal-example-form space-y-4">
	<form class="modal-form border border-surface-500 p-4 space-y-4 rounded-container-token">
		<label class="input-label">
			<span>{translations.label_name}</span>
			<input
				type="text"
				class="block {wrongFullName ? 'border !border-primary-500 !text-error-500' : ''}"
				bind:value={name}
				placeholder="{translations.label_name}..."
			/>
		</label>

		<label class="input-label input-group">
			<span>{translations.label_username}</span>
			<div>
				<div class="relative mt-1 rounded-md shadow-sm">
					<input
						type="text"
						class="block w-full rounded-md {wrongUsername
							? 'border !border-primary-500 !text-error-500'
							: ''}"
						placeholder="{translations.label_username}..."
						bind:value={username}
					/>
					<div class="absolute inset-y-0 top-2 right-0 flex items-center">
						<span
							class="card p-2 pt-3 pb-3 text-surface-300 {wrongUsername
								? 'border !border-primary-500 !text-error-500'
								: ''}">{env.PUBLIC_EMAIL_DOMAIN}</span
						>
					</div>
				</div>
			</div>
		</label>
		<label class="input-label">
			<span
				>{#if editingUser}
					{translations.input_hint_new}
				{/if}
				{translations.input_hint_temp_password}</span
			>
			<input
				class="font-mono"
				type="text"
				bind:value={tempPasswd}
				placeholder="{translations.input_hint_temp_password}..."
			/>
		</label>
		{#if editingUser}
			<p class="!text-xs !text-surface-400">UserID: {userID}</p>
		{/if}
	</form>
	<!-- prettier-ignore -->
	<footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{translations.btn_cancel}</button>
        <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>{translations.btn_submit}</button>
    </footer>
</div>
