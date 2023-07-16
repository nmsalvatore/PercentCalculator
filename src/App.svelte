<script>
	import { settingsVisible } from './store.js'
	import Header from './components/Header.svelte'
    import Calculator from './components/Calculator.svelte'
	import ShowSettingsButton from './components/buttons/ShowSettingsButton.svelte'
	import Settings from './components/Settings.svelte';
</script>

<body>
	<Header />
	<Calculator />
	<ShowSettingsButton />
	{#if $settingsVisible}
		<Settings />
	{/if}
</body>