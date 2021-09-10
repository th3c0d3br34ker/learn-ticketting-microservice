import Stripe from 'stripe';

if (!process.env.STRIPE_KEY) {
  throw new Error('Stripe key not present!');
}

export const stripe = new Stripe(process.env.STRIPE_KEY, {
  apiVersion: '2020-08-27',
});
