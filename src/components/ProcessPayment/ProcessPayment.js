import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';
// import SplitCardForm from './SplitCardForm';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51Ie9RMCsTKnXwRxWXOU1ksT3LUTd8NowxwAJ1qSV7e0IZpHjs0Wjw6Kr8EUcAOFCtdyVDJR9JTW1fhW6kdfNCXGa00Jmy8LYre');
// const stripePromise = loadStripe('sk_test_51Ie9RMCsTKnXwRxWYvFz230bofN0ZUxJZI0q7hHPaEqwtQCqUdX3tom8Qn9sIvLUxKwsfurTPBVSVHMhaeS8AYin00XXQXoKfl');


const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>

<SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
{/* <SplitCardForm></SplitCardForm> */}

        </Elements>
    );
};

export default ProcessPayment;