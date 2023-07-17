<script>
    import HideSettingsButton from './buttons/HideSettingsButton.svelte';
    import { decimalPlaces, calculationMethod, showEquation } from '../store';

    function handleFocus(event) {
        event.target.blur();
    }

    function handleDecimalChange(event) {
        decimalPlaces.set(parseInt(event.target.value));
    }
</script>

<aside>
    <h3>Settings</h3>
    <HideSettingsButton />
    <div class="settings-container">
        <label>
            <h5>Decimal Places:</h5>
            <input class="decimal-input" bind:value={$decimalPlaces} type="number" min="0" max="5"  on:keydown|preventDefault on:focus|self={handleFocus} on:change={handleDecimalChange}>
        </label>

        <label>
            <h5>Calculation Method:</h5>
            <select bind:value={$calculationMethod}>
                <option value="percent_difference">Percent Difference</option>
                <option value="percent_change">Percent Change</option>
            </select>
        </label>

        <label>
            <h5>Show Equation:</h5>
            <input type="checkbox" bind:checked={$showEquation}>
        </label>
    </div>
</aside>

<style>
    aside {
        top: 0;
        right: 0;
        width: 480px;
        height: 100%;
        background: #f8f8f8;
        border-left: 2px solid #eee;
        padding: 2rem;
        z-index: 1;
    }

    @media only screen and (max-width: 1000px) {
        aside {
            position: absolute;
            width: 480px;
        }
    }

    @media only screen and (max-width: 480px) {
        aside {
            padding: 1.5rem;
            width: 100%;
        }
    }

    h3 {
        margin-bottom: 4rem;
        font-size: 16px;
        color: #666;
        letter-spacing: 1px;
    }

    h5 {
        display: inline-block;
    }

    label {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 500;
        font-variant: all-small-caps;
        letter-spacing: 2px;
        color: #aaa;
        margin: 2rem 0;
        width: 100%;
    }

    select {
        padding: 0.5rem;
        background: #f4f4f4;
        margin-left: 1rem;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    input[type="checkbox"] {
        margin: 0.5rem 0;
    }

    .decimal-input {
        background: none;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 0.5rem;
        margin-left: 1rem;
        width: 60px;
    }

</style>