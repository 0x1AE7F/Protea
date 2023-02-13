<script lang="ts">
	import { env } from '$env/dynamic/public';
	import {
		modalStore,
		type ModalComponent,
		type ModalSettings,
		Modal
	} from '@skeletonlabs/skeleton';

	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';
	import UserManagementForm from './UserManagementForm.svelte';

	// +page.server.ts load function will feed the prefetched data into the variable below
	// TODO: Find some way to stop typescript from crying about object properties
	export let data: object;

	// Creating a new datahandler which contains the DataTable translations
	// and configs
	const handler = new DataHandler(data.users, {
		rowsPerPage: 10,
		i18n: data.translations.admin_user.datatable
	});

	// This function creates a modal which allows the user to edit the given profile
	// This function will get called when
	// a person presses on the 'new button' or on the cog icon next to the user
	function createUserManagementModal(
		editingUser: boolean,
		name: string,
		username: string,
		userID: string
	): void {
		const c: ModalComponent = { ref: UserManagementForm };
		const d: ModalSettings = {
			type: 'component',
			title: editingUser
				? data.translations.admin_user.modal_title_edit_account
				: data.translations.admin_user.create_new_user,
			body: '',
			component: c,
			response: () => {
				location.reload();
			},
			meta: {
				editingUser: editingUser,
				name: name,
				username: username,
				userID: userID
			}
		};
		modalStore.trigger(d);
	}
</script>

<Modal />

<div style="max-width: 750px;">
	<!-- Users Section -->

	<div class="border border-surface-500 pt-2">
		<div class="pl-4">
			<button
				class="btn btn-filled-primary"
				on:click={() => {
					createUserManagementModal(false, '', '', '');
				}}
				>{data.translations.admin_user.create_new_user}
				<space />
				<img src="/icons/user-plus.svg" class="svg-white" alt="User Add Icon" />
			</button>
		</div>

		<Datatable {handler}>
			<table>
				<thead>
					<tr>
						<Th {handler} orderBy="name">Name</Th>
						<Th {handler} orderBy="email">E-Mail</Th>
						<Th {handler} orderBy="actions">Aktionen</Th>
					</tr>
					<tr>
						<ThFilter {handler} filterBy="name" />
						<ThFilter {handler} filterBy="email" />
					</tr>
				</thead>
				<tbody>
					<!-- TODO: Fix this 'visual' bug -->
					{#each data.users as row}
						<tr>
							<td class="text-primary-500">{row.full_name}</td>
							<td class="text-secondary-500"
								>{row.username}@{env.PUBLIC_EMAIL_DOMAIN != undefined
									? env.PUBLIC_EMAIL_DOMAIN
									: ''}</td
							>
							<td>
								<button
									class="btn"
									on:click={() => {
										createUserManagementModal(true, row.full_name, row.username, row.id);
									}}
								>
									<img src="/icons/settings.svg" class="svg-white" alt="Settings" />
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</Datatable>
	</div>
</div>
