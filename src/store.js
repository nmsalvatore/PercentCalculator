import { writable } from 'svelte/store';

export const settingsVisible = writable(false);
export const decimalPlaces = writable(2);
export const calculationMethod = writable('percent_difference');
export const showEquation = writable(true);
export const loading = writable(true);
export const equationStepsStore = writable([]);

// Check if MathJax is loaded every 200ms, and update the loading store accordingly
let checkInterval = setInterval(() => {
    if (window.MathJax) {
        loading.set(false);
        clearInterval(checkInterval);
    }
}, 200);