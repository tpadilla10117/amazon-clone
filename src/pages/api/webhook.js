/* Webhook: */

    import { buffer } from 'micro';
    import * as admin from 'firebase-admin';

/* Secure a connection to FIREBASE from the backend - */ 

/* Give admin permission to go into database (backnend) -> configure in Project settings - Service accounts in Firebase */
/* Generate a private key and drag into IDE */

    const serviceAccount = require('../../../permissions.json');

/* Here I initialize the app with the proper firebase credentials (Private key) and account for if there is no admin:  */
    //if no app already initialized...else use the one that is initialized
    const app = !admin.apps.length ? admin.initializeApp( { 
        credential: admin.credential.cert(serviceAccount)
    }) : admin.app();


//Establish a connection to Stripe
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    export default async (req, res) => {
        if (req.method === 'POST') {

        }
    }