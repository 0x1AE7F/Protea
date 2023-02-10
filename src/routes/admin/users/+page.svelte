<script lang="ts">
	import { env } from '$env/dynamic/public';
	import exampleTableData from '$lib/example-table-data';
	import {
		modalStore,
		type ModalComponent,
		type ModalSettings,
		Modal
	} from '@skeletonlabs/skeleton';
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';
	import UserManagementForm from './UserManagementForm.svelte';

	// Creating a new datahandler which contains the DataTable translations
	// and configs
	const handler = new DataHandler(exampleTableData, {
		rowsPerPage: 10,
		i18n: {
			search: 'Suche...',
			show: 'Zeige',
			entries: 'Einträge',
			filter: 'Filter',
			rowCount: 'Zeige Einträge {start} bis {end} von {total}',
			noRows: 'Keine Einträge gefunden',
			previous: 'Vorherige',
			next: 'Nächste'
		}
	});
	//const rows = handler.getRows();

	// +page.server.ts load function will feed the prefetched data into the variable below
	export let data: object;

	console.log(data);

	// This function creates a modal which allows the user to edit the given profile
	// This function will get called when
	// a person presses on the 'new button' or on the cog icon next to the user
	function createUserManagementModal(editingUser: boolean, name: string, username: string): void {
		console.log('ModalOpen!');
		const c: ModalComponent = { ref: UserManagementForm };
		const d: ModalSettings = {
			type: 'component',
			title: editingUser ? 'Konto bearbeiten' : 'Neues Konto erstellen',
			body: '',
			component: c,
			response: (r: any) => {
				if (r) console.log('response:', r);
			},
			meta: {
				editingUser: editingUser,
				name: name,
				username: username
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
					createUserManagementModal(false, '', '');
				}}
				>Neuen Benutzer erstellen
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
							<!-- TODO: Pass userID forward and display it somewhere -->
							<td>
								<button
									class="btn"
									on:click={() => {
										createUserManagementModal(true, row.full_name, row.username);
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
