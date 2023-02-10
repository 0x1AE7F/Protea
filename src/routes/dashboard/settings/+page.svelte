<script lang="ts">
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';
	import AdminTab from './tabs/adminTab.svelte';
	import PersonalInformationsTab from './tabs/personalInformationsTab.svelte';
	import PersonalSettings from './tabs/personalSettings.svelte';
	const storeTab: Writable<string> = writable('a');
	// TODO: Add translations here!
</script>

<TabGroup selected={storeTab}>
	<Tab value="a" rounded="false">Persöhnliche Informationen</Tab>
	<Tab value="c" rounded="false">Einstellungen</Tab>
</TabGroup>

{#if $storeTab === 'a'}<PersonalInformationsTab />{/if}
{#if $storeTab === 'b'}<AdminTab />{/if}
{#if $storeTab === 'c'}<PersonalSettings />{/if}
