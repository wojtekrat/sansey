import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {

  if (req.method === 'POST' && req.body.user.email != undefined) {
    try {
        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            customer_email: req.body.user.email,
            billing_address_collection: 'auto',
            shipping_options: [
                {shipping_rate: 'shr_1MEfpvGKIZyiy5RILwLJrPfR'},
                {shipping_rate: 'shr_1MEfqmGKIZyiy5RIgAUa7n6h'},
            ],

            line_items: req.body.cart.map((item) => {
                const img = item.image[0].asset._ref;
                return {
                    price_data: {
                        currency: 'pln',
                        product_data: {
                            name: item.name,
                            images: [img],
                        },
                    unit_amount: item.price * 100,
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                      },
                      quantity: item.quantity,
                }
            }),
            success_url: `${req.headers.origin}/success`,
            cancel_url: `${req.headers.origin}/canceled`,
          }
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session)
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}