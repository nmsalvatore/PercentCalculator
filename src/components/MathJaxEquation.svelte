<script>
    import { onMount, afterUpdate } from 'svelte';
    import ShowEquationSwitch from './buttons/ShowEquationSwitch.svelte';
    
    export let equation = "";

    let equationElement;

    const updateMathJax = () => {
        if (window.MathJax) {
            window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, equationElement]);
        }
    };

    onMount(updateMathJax);
    afterUpdate(updateMathJax);
</script>

<div bind:this={equationElement} class="mathjax-equation">
    {@html equation}
</div>

<style>
    .mathjax-equation {
        height: 72px;
        margin-top: 3rem;
        color: transparent;
    }
</style>
