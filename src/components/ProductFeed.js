/* Component to handle my feed of products on the landing page: */

    function ProductFeed ( {products} ) {
        return (
            <div>
                {products.map( ({ id, title, price, description, category, image }) => (
                    <p>{title}</p>
                ))}
            </div>
        );
    };

    export default ProductFeed;