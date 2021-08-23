/* Webhook for Next.js endpoint: */

    import { buffer } from 'micro';
    import * as admin from 'firebase-admin';

/* Secure a connection to FIREBASE from the backend - */ 

/* Give admin permission to go into database (backnend) -> configure in Project settings - Service accounts in Firebase */
/* Generate a private key and drag into IDE */

    const serviceAccount = /* require('../../../permissions.json') */ require('../../../permissions');

/* Here I initialize the app with the proper firebase credentials (Private key) and account for if there is no admin:  */
    //if no app already initialized...else use the one that is initialized
    const app = !admin.apps.length ? admin.initializeApp( { 
        credential: admin.credential.cert(serviceAccount)
    }) : admin.app();


//Establish a connection to Stripe
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

/* 1) Pushes order info into firestore: */
    const fulfillOrder = async (session) => {
        console.log('Fulfilling order', session);
        return app.firestore().collection('users').doc(session.metadata.email).collection('orders').doc(session.id).set( {
            amount: session.amount_total / 100,
            amount_shipping: session.total_details.amount_shipping / 100,
            images: JSON.parse(session.metadata.images),
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        })
        .then ( () => {
            console.log(`SUCCESS: Order ${session.id} has been added to the DB`);
        })
    };

    export default async (req, res) => {
        if (req.method === 'POST') {
            const requestBuffer = await buffer(req);
            const payload = requestBuffer.toString();
            const signature = req.headers["stripe-signature"];

            let event;
        // 2) Verify that the EVENT posted came from stripe:
            try {
                event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
            } catch (err) {
                console.log('ERROR', err.message)
                return res.status(400).send(`Webhook error: ${err.message}`)
            }

        // 3) Handle the checkout.session.completed event and push it into database:
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;


            // 4) Fulfill the order...
            return fulfillOrder(session).then( () => res.status(200))
            .catch( (err) => res.status(400).send(`Webhook Error: ${err.message}`));

        }


        }
    };

/* Disable the bodyParser to get info back as a stream rather than a request object: */
    export const config = {
        api: {
            bodyParser: false,
            externalResolver: true /* Stripe resolves... */
        },
    };