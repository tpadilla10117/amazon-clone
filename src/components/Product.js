    import Image from "next/image";
    import { useState } from "react";
    import { StarIcon } from "@heroicons/react/solid";
    import Currency from 'react-currency-formatter';
    import { useDispatch } from "react-redux";
    import { addToBasket } from "../slices/basketSlice";

/* Variables for randomizing review stars: */
    const MAX_RATING = 5;
    const MIN_RATING = 1;

    function Product ( { id, title, price, description, category, image } ) {

    /* useDispatch lets me dispatch / shoot actions into the Global Store:*/
        const dispatch = useDispatch();

        /* State for randomized Review Stars: */
        const [ rating ] = useState(
            Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
        );

        /* State for randomized Amazon Prime: */

        const [ hasPrime ] = useState(Math.random() < 0.5  );

        /* This is for the onClick on the product cards */
        /* It dispatches an item into Global Store: */
        const addItemToBasket = () => {
            const product = {
                id, 
                title, 
                price, 
                description, 
                category, 
                image,
            };

        //Sending the product as an action to the REDUX store...the basket slice
            dispatch(addToBasket(product) );
        };


        return (
            <div className="relative flex flex-col m-5 bg-white z-30 p-10">
                <p className="absolute top-2 right-2 text-xs italic text-gray-400">{category}</p>

                <Image src={image} height={200} width={200} objectFit="contain" />

                <h4 className="my-3">{title}</h4>
            {/* Create an enpmy Array with the existing state, fill it with empty values, then map through those values: */}
                <div className="flex">
                        {Array(rating).fill().map( (_, index) => (
                            <StarIcon key={index} className="h-5 text-yellow-500" />
                        ))}
                    
                </div>

                <p className="text-xs mt-2 my-2 line-clamp-2">{description}</p>

                <div className="mb-5">
                    <Currency quantity={price} /* currency="GDP" */ />
                </div>

                {hasPrime && (
                    <div className="flex items-center space-x-2 -mt-5">
                        <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
                        <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
                    </div>
                )}

                <button className="mt-auto button" onClick={addItemToBasket}>Add to Basket</button>




            </div>
        );
    };

    export default Product;