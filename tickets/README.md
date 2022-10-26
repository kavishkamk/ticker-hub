## This is a Ticket Service

- This is a micro Service
- This is RESTfull API, used MVC architecture
- tickets deployment ([./infra/k8s/tickets-depl.yaml](https://github.com/kavishkamk/ticket-hub/blob/main/infra/k8s/tickets-depl.yaml))
- Service created with Node.js, Express, TypeScript
- Error handling
- Build [ Dockerfile](https://github.com/kavishkamk/ticket-hub/blob/main/tickets/Dockerfile) for build docker image
- mongoDB connection with [mongoose](https://mongoosejs.com/)
- Handled unhandled routes
- Backend validation
- Testing with jest, ts-jest, supertest and mongodb-memory-server
- use shared library ([@tickethub-kv/common](https://www.npmjs.com/package/@tickethub-kv/common))

## project spesific shared library
- [@tickethub-kv/common](https://www.npmjs.com/package/@tickethub-kv/common)

## used npm packages

- [express](https://expressjs.com/)
- [typescript](https://www.typescriptlang.org/)
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)
- [mongoose](https://mongoosejs.com/)
- [jest](https://jestjs.io/)
- [ts-jest](https://www.npmjs.com/package/ts-jest)
- [supertest](https://www.npmjs.com/package/supertest)
- [mongodb-memory-server](https://www.npmjs.com/package/mongodb-memory-server)