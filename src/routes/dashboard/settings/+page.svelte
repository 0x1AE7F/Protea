<script lang="ts">
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';
	import PersonalInformationsTab from './tabs/personalInformationsTab.svelte';
	import PersonalSettings from './tabs/personalSettings.svelte';
	const storeTab: Writable<string> = writable('a');

	// TODO: Find some way to stop typescript from crying about object properties

	export let data: object;
</script>

<TabGroup selected={storeTab}>
	<Tab value="a" rounded="false">{data.translations.user_settings.personal_settings_tab}</Tab>
	<Tab value="b" rounded="false">{data.translations.user_settings.settings_tab}</Tab>
</TabGroup>

{#if $storeTab === 'a'}<PersonalInformationsTab />{/if}
{#if $storeTab === 'b'}<PersonalSettings />{/if}
