This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

To, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- This is front end application of Ticket-hub created with [Next.js](https://nextjs.org/)
- This developed as a micro service
- Server side rendering with Next.js
- auth deploymnet ([./infra/k8s/client-depl.yaml](https://github.com/kavishkamk/ticket-hub/blob/main/infra/k8s/client-depl.yaml))
- used [Bootstrap](https://getbootstrap.com/), [tailwind.css](https://tailwindcss.com/) framworks
- [Axios](https://www.npmjs.com/package/axios) for requests
- Fetch data in Server Side Rendering (through ingress-nginx)
- Cross Namespace Service communication (with ingress-nginx)

## used npm packages

- [Next.js](https://nextjs.org/)
- [react](https://www.npmjs.com/package/react)
- [react-dom](https://www.npmjs.com/package/react-dom)
- [Axios](https://www.npmjs.com/package/axios)
- [Bootstrap](https://getbootstrap.com/)
- [tailwind.css](https://tailwindcss.com/)