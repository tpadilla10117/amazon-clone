/* Backend API endpoint for Checkout session: */

    //Import stripe dependency and the Secret Key (only loaded on backend)...
        const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

        export default async (req, res) => {
        //Passing the items from the request body to the backend...
            const { items, email } = req.body;

            console.log(email);
            console.log(items);

        //Need to transform data in my array into the format that Stripe.js module expects...
            const transformedItems = items.map( item => ({
                description: item.description,
            /* Will need to change quantity logic if I group items together */
                quantity: 1,
                price_data: {
                    currency: 'usd',
                    unit_amount: item.price * 100,
                    product_data: {
                        name: item.title,
                        images: [item.image]
                    },

                }
            }) );

        /* Where the checkout session is created: */
            const session = await stripe.checkout.sessions.create( {
                payment_method_types: ["card"],
                shipping_rates: ['shr_1JPszQEBffiLxpo4MmmtQbNh'],
                shipping_address_collection: {
                    allowed_countries: ['GB', 'US', 'CA']
                },
                line_items: transformedItems,
                mode: 'payment',
                success_url: `${process.env.HOST}/success`,
                cancel_url: `${process.env.HOST}/checkout`,
                metadata: {
                    email,
                    images: JSON.stringify(items.map( item => item.image) )
                },

            } );

        /* Response is the session.id... */
            res.status(200).json( { id: session.id } )

        };