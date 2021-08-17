/* Component to handle my feed of products on the landing page: */

    import { Product } from ".././utils";

    function ProductFeed ( {products} ) {
        return (
            <div>
                {products.map( ({ id, title, price, description, category, image }) => (
                    <Product 
                        key={id}
                        id={id}
                        title={title}
                        price={price}
                        description={description}
                        category={category}
                        image={image}
                    />
                ))}
            </div>
        );
    };

    export default ProductFeed;