/* This page shows a user's order history: */
    import { Header } from "../utils";
    import { useSession, getSession } from "next-auth/client"; //to check logged in user's session data
    import moment from "moment";
    import db from '../../firebase';

    function Orders( {orders} ) {

        const [ session ] = useSession();
        console.log(orders);

        return (
            <div>
                <Header />

                <main className="max-w-screen-lg mx-auto p-10">
                    <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">Your Orders</h1>

            {/* If a session... */}
                {session ? (
                    <h2>x Orders</h2>
                ) : (
                    <h2>Please sign in to see your orders</h2>
                )}

                <div className="mt-5 space-y-4"></div>

            {/* With the returned data , generate Order items in the UI:*/}
               {/*  {order?.map( order => {
                    <Order />
                })} */}


                </main>

            </div>
        );
    };

    export default Orders;

    //server-side render the data before a user hits the page
    //we are pre-rendering so the user sees the page fully rendered
    //getServerSideProps is essentially Node.js

    export async function getServerSideProps(context) {
        const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

        //Get the user;s logged in credentials...
        const session = await getSession(context);

        if(!session) {
            return {
                props: {},
            };
        };

    /* 1) Fetch user's info from firestore (firebase db): */
        const stripeOrders = await db.collection('users')
            .doc(session.user.email)
            .collection('orders')
            .orderBy('timestamp', 'desc')
            .get();


    /* 2) Fetch info from Stripe API using orders from Firestore: */
        const orders = await Promise.all(
            stripeOrders.docs.map( async (order) => ( {
                id: order.id,
                amount: order.data().amount,
                amountShipping: order.data().amount_shipping,
                images: order.data().images,
                /* convert timestamp to unix so we can maintain data shape */
                timestamp: moment(order.data().timestamp.toDate()).unix(),

                /* async call fetches info from stripe session,  */
                /* gives it back, and maps it to the items key*/
                items: (
                    await stripe.checkout.sessions.listLineItems(order.id, {
                        limit: 100
                    })
                ).data,
            }))
        );

/* return orders as a prop to be used in order component: */
        return {
            props: {
                orders,
            }
        };

    };