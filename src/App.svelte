<script>
	import { settingsVisible } from './store.js'
    import Calculator from './components/Calculator.svelte'
	import ShowSettingsButton from './components/buttons/ShowSettingsButton.svelte'
	import Settings from './components/Settings.svelte';
    import Header from './components/Header.svelte';
</script>

<main>
	<Header />
	<Calculator />
	<ShowSettingsButton />
</main>
{#if $settingsVisible}
	<Settings />
{/if}

<style>
	main {
		display: flex;
		flex: 1;
		flex-direction: column;
	}
</style>