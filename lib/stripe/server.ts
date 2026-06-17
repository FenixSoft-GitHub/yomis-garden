import Stripe from "stripe";

let stripe: Stripe;

export function getStripeServer() {
  if (!stripe) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-05-27.dahlia", // <-- Cambia a la versión esperada por el paquete
    });
  }
  return stripe;
}

// import Stripe from "stripe";

// let stripe: Stripe;

// export function getStripeServer() {
//   if (!stripe) {
//     stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//       apiVersion: "2025-05-28.basil",
//     });
//   }
//   return stripe;
// }
