<script>
    import { decimalPlaces, showEquation, calculationMethod } from '../store.js'
    import { writable } from 'svelte/store';
    import MathJaxEquation from './MathJaxEquation.svelte';

    let value1 = null;
    let value2 = null;
    let percentResult = 0;
    let equationStore = writable('');

    $: {
        if (value1 != null && value2 != null) {
            let difference, average, step1, step2, fullEquation;
            if ($calculationMethod === 'percent_difference') {
                difference = Math.abs(+(value1 - value2).toFixed(10));
                average = +((value1 + value2) / 2).toFixed(10);
                percentResult = (difference / average * 100).toFixed($decimalPlaces);
                fullEquation = `$$\\frac{{\\left| ${value1} - ${value2} \\right|}}{{\\frac{{${value1} + ${value2}}}{2}}} \\times 100\\%$$`;
                step1 = `$$\\frac{${difference}}{${average}} \\times 100\\%$$`;
                step2 = `$$${(difference/average).toFixed($decimalPlaces+2)} \\times 100\\% = ${percentResult}\\%$$`;
                equationStore.set(`${fullEquation} \\ ${step1} \\ ${step2}`);
            } else if ($calculationMethod === 'percent_change') {
                difference = +(value2 - value1).toFixed(10);
                percentResult = (difference / Math.abs(value1) * 100).toFixed($decimalPlaces);
                fullEquation = `$$\\frac{{${value2} - ${value1}}}{{|${value1}|}} \\times 100\\%$$`;
                step1 = `$$\\frac{${difference}}{${Math.abs(value1)}} \\times 100\\%$$`;
                step2 = `$$${+(difference/Math.abs(value1)).toFixed($decimalPlaces+2)} \\times 100\\% = ${percentResult}\\%$$`
                equationStore.set(`${fullEquation} \\ ${step1} \\ ${step2}`);
            }
        } else {
            percentResult = 0.00000.toFixed($decimalPlaces)
            equationStore.set(getEquationTemplate($calculationMethod));
        }
    }

    function getEquationTemplate(type) {
        const differenceEquation = `$$\\frac{{\\left| V_{1} - V_{2} \\right|}}{{\\frac{{V_{1} + V_{2}}}{2}}} \\times 100\\%$$`;
        const changeEquation = `$$\\frac{{V_{2} - V_{1}}}{{|V_{1}|}} \\times 100\\%$$`;
        return type === 'percent_difference' ? differenceEquation : changeEquation;
    }
</script>

<div class="calculator">
    <input class="input1" type="number" bind:value={value1} placeholder="Value 1">
    <input class="input2" type="number" bind:value={value2} placeholder="Value 2">
    <h2 class="percentage">{percentResult}<span class="percent-symbol">%</span></h2>
    {#if $showEquation}
        <MathJaxEquation bind:equation={$equationStore} />
    {/if}
</div>

<style>
	.calculator {
		display: flex;
		flex-direction: column;
		flex: 1;
		justify-content: center;
		padding: 2rem 0;
		align-items: center;
		margin-bottom: calc(85.5px + 1vh);
	}

	.percent-symbol {
		font-size: 24px;
		margin-left: 6px;
		font-weight: normal;
	}

	.percentage {
		color: #555;
		font-size: 48px;
		margin-top: 4rem;
	}

    input {
		border: none;
        border-left: 1px solid #eaeaea;
        border-right: 1px solid #eaeaea;
		background: #fafafa;
		color: #777;
		font-family: Roboto, sans-serif;
		font-size: 20px;
        width: 240px;
		text-align: center;
        padding: 0.75rem;
		/* margin: 0.25rem 0; */
    }

    input.input1 {
        border-radius: 5px 5px 0 0;
		border-top: 1px solid #eaeaea;
        border-bottom: 1px solid #eee;
    }

    input.input2 {
        border-bottom: 1px solid #eaeaea;
        border-radius: 0 0 5px 5px;
    }

	input:focus {
		outline: none;
	}

	input::placeholder {
		color: #aaa;
	}

	input[type="number"] {
		-moz-appearance: textfield;
	}

	input[type="number"]::-webkit-inner-spin-button,
	input[type="number"]::-webkit-outer-spin-button {
		-webkit-appearance: none;
	}

    @media only screen and (max-width: 480px) {
        .calculator {
            margin-bottom: calc(67px + 1vh);
        }
    }
</style>
