import { Header, CheckoutProduct } from '../utils';
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/client";

function Checkout () {

    const items = useSelector( selectItems );

/* Logged in User's session data: */
    const [ session ] = useSession();

    return (
        <div className="bg-gray-100">
            <Header />

            <main className="lg:flex max-w-screen-2xl mx-auto">
   
            {/* Left section: */}
                <div className="flex-grow m-5 shadow-sm">
                    <Image 
                        src="https://links.papareact.com/ikj"
                        width={1020}
                        height={250}
                        objectFit="contain"
                    />

                    <div className="flex flex-col p-5 space-y-10 bg-white">
                        <h1 className="text-3xl border-b pb-4">
                            {items.length === 0 ? "Your Amazon Basket is empty." : "Shopping Basket"}
                        </h1>

                    {/* Where I render the products in the checkout page: */}
                        {items.map( (item, index) => (
                            <CheckoutProduct 
                                key={index}
                                id={item.id}
                                title={item.title}
                                rating={item.rating}
                                price={item.price}
                                description={item.description}
                                category={item.category}
                                image={item.image}
                                hasPrime={item.hasPrime}

                            />
                        ) )}


                    </div>


                </div>


            {/* Right section: */}
                <div>
                    {items.length > 0 && (
                        <>
                            <h2 className="whitespace-nowrap">Subtotal ( {items.length} items ):
                                <span className="font-bold">
                                    {/* <Currency /> */}
                                </span>
                            </h2>

                            <button className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
                                {!session ? 'Sign in to checkout' : 'Proceed to checkout'}
                            </button>

                        </>


                    )}
                </div>



            </main>


        </div>
    );
};

export default Checkout;