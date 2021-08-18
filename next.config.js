/* Config for Next.js: */
/* Have to explicitly tell Next.js which domains you are pulling for Image tag */
    module.exports = {
        images: {
            domains: ['links.papareact.com', "fakestoreapi.com"]
        },

        /* This is only for the public key - DONT PUT PRIVATE KEYS HERE or risk EXPOSURE!!! */
        env: {
            stripe_public_key: process.env.STRIPE_PUBLIC_KEY
        }

    };