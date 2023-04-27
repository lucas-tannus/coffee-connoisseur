# Coffee Connoisseur

This is a ZTM (Zero to Mastery) course project. 

The goal is create an application that provides a list of coffee near by your location.

This application is runnig on https://coffee-connoisseur-orpin.vercel.app/, check it!

---

## Technical Infomation

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/](http://localhost:3000/api/hello).

#### Local Environment Variables

In order to fetch the coffee store information you need to provide the Client Id from [FQS developer project](https://foursquare.com/developers/home). Add the Client Id on the `FOURSQUARE_KEY` environment variable.

Moreover, set the `NEXT_PUBLIC_UNSPLASH_KEY` variable to fetch all coffee stores' images. You can configure it on [Unsplash](https://unsplash.com/documentation) documentation.

Also, create a spreadsheet on [Aitable](https://airtable.com/developers) called `coffee-stores`. Next, set the base key using `AIRTABLE_BASE_KEY` and api key using `AIRTABLE_API_KEY` environment variables.


### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.