<script>
    import { calculationMethod } from "../store";

    let headingText = '';

    $ : {
        if ($calculationMethod == 'percent_difference') {
            headingText = 'Percent Difference Calculator';
        } else {
            headingText = 'Percent Change Calculator'
        }
    }
</script>

<header>
    <h1>{headingText}</h1>
</header>

<style>
    h1 {
        font-size: 18px;
        color: #555;
        padding: 2rem;
        font-family: Roboto, Helvetica, sans-serif;
        font-weight: 500;
        letter-spacing: 0.25px;
    }

    @media only screen and (max-width: 480px) {
        h1 {
            padding: 1.5rem;
        }
    }
</style>