# Project Description:

A replica of Amazon using Next.js, Tailwind CSS, Redux, Firebase, and NextAuth

# Installation Steps
`npm install @heroicons/react` -> for hero icons
`npm install firebase` -> BaaS for authentication and shopping
`npm i react-responsive-carousel` -> for carousel dependency
`npm install react-currency-formatter` -> for currency fortmatter dependency
`npm install next-auth` -> for next-auth dependency
`npm install --save stripe` -> to install the Stripe library
`npm install @stripe/stripe-js` -> install Stripe.js Module to make server-side requests to to Stripe API and to provide methods for including Stripe.js in client-side code
`npm install axios` -> promise based HTTP client for browser and node.js
`brew install stripe/stripe-cli/stripe` -> installed the Stripe CLI with homebrew

<!-- Data fetched from Fakestore APi, which is a REST API -->

## Using npm

Run commands

1) ```npm install```


2) ```npm run dev```


## Or using yarn

Run commands 

1) ```npm install --global yarn```

2) ```yarn install```

3) ```yarn run dev```

## Stripe Processes:

After login & authentication, run `stripe listen --forward-to localhost:3000/api/webhook` for local environment -> receive a STRIPE_SIGNING_SECRET and place into environment variable


