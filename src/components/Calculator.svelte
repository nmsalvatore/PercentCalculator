<script>
    import { decimalPlaces, showEquation, calculationMethod } from '../store.js'
    import { writable } from 'svelte/store';
    import MathJaxEquation from './MathJaxEquation.svelte';

    let value1 = null;
    let value2 = null;
    let percentResult = 0;
    let equationStore = writable('');

    let debounce;

    $: {
        if (value1 != null && value2 != null) {
            clearTimeout(debounce);
            debounce = setTimeout(() => {
                if ($calculationMethod === 'percent_difference') {
                    percentResult = calculatePercentDifference(value1, value2).toFixed($decimalPlaces);
                    equationStore.set(getEquationTemplate('result', value1, value2));
                } else if ($calculationMethod === 'percent_change') {
                    percentResult = calculatePercentChange(value1, value2).toFixed($decimalPlaces);
                    equationStore.set(getEquationTemplate('result', value1, value2));
                }
            }, 300);
        } else {
            percentResult = 0.00000.toFixed({$decimalPlaces})
            if ($calculationMethod === 'percent_difference') {
                equationStore.set(getEquationTemplate('difference'));
            } else if ($calculationMethod === 'percent_change') {
                equationStore.set(getEquationTemplate('change'));
            }
        }
    }

    function calculatePercentDifference(a, b) {
        const difference = Math.abs((a - b) / ((a + b) / 2)) * 100;
        return isNaN(difference) ? 0 : difference;
    }

    function calculatePercentChange(v1, v2) {
        const difference = ((v2 - v1) / Math.abs(v1)) * 100;
        return isNaN(difference) ? 0 : difference;
    }

    function getEquationTemplate(type, v1, v2) {
        const differenceEquation = `$$\\frac{{\\left| V_{1} - V_{2} \\right|}}{{\\frac{{V_{1} + V_{2}}}{2}}} \\times 100\\%$$`;
        const changeEquation = `$$\\frac{{V_{2} - V_{1}}}{{|V_{1}|}} \\times 100\\%$$`;
        const resultDifferenceEquation = `$$\\frac{{\\left| ${v1} - ${v2} \\right|}}{{\\frac{{${v1} + ${v2}}}{2}}} \\times 100\\% = ${percentResult}\\%$$`;
        const resultChangeEquation = `$$\\frac{{${v2} - ${v1}}}{{|${v1}|}} \\times 100\\% = ${percentResult}\\%$$`;

        switch(type) {
            case 'difference': 
                return differenceEquation;
            case 'change':
                return changeEquation;
            case 'result':
                if (v1 !== null && v2 !== null) {
                    if ($calculationMethod === 'percent_difference') {
                        return resultDifferenceEquation;
                    } else if ($calculationMethod === 'percent_change') {
                        return resultChangeEquation;
                    }
                } else {
                    if ($calculationMethod === 'percent_difference') {
                        return differenceEquation;
                    } else if ($calculationMethod === 'percent_change') {
                        return changeEquation;
                    }
                }
                default:
                return differenceEquation;
        }
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
		margin-bottom: calc(90.5px + 1vh);
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
        margin-bottom: 3rem;
	}

    input {
		border: none;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
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
		border-top: 1px solid #ccc;
        border-bottom: 1px solid #e4e4e4;
    }

    input.input2 {
        border-bottom: 1px solid #ccc;
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
</style>
