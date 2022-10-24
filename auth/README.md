## This is a Auth Service API

- This is a micro service
- This is RESTfull API, used MVC architecture
- auth deploymnet ([./infra/k8s/auth-depl.yaml](https://github.com/kavishkamk/ticket-hub/blob/main/infra/k8s/auth-depl.yaml))
- Service created with Node.js, Express, TypeScript
- Signin, Signup, Signout, check current user logged in or not
- Error handling
- Build [ Dockerfile](https://github.com/kavishkamk/ticket-hub/blob/main/auth/Dockerfile) for build docker image
- mongoDB connection with [mongoose](https://mongoosejs.com/)
- Password hasing
- Issue JWT through cookies ([jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken))
- Handled unhandled routes
- Backend validation
- Use environment variables store in [kubernetes Secrets](https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/)
- Deployment file of Auth Service ([.infra/k8s/auth-depl.yaml](https://github.com/kavishkamk/ticket-hub/blob/main/infra/k8s/auth-depl.yaml))
- Testing with jest, ts-jest, supertest and mongodb-memory-server
- use shared library ([@tickethub-kv/common](https://www.npmjs.com/package/@tickethub-kv/common))

## project spesific shared library
- [@tickethub-kv/common](https://www.npmjs.com/package/@tickethub-kv/common)

## used npm packages

- [express](https://expressjs.com/)
- [typescript](https://www.typescriptlang.org/)
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)
- [express-validator](https://express-validator.github.io/docs/)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [mongoose](https://mongoosejs.com/)
- [mongoose-unique-validator](https://www.npmjs.com/package/mongoose-unique-validator)
- [cookie-session](https://www.npmjs.com/package/cookie-session)
- [jest](https://jestjs.io/)
- [ts-jest](https://www.npmjs.com/package/ts-jest)
- [supertest](https://www.npmjs.com/package/supertest)
- [mongodb-memory-server](https://www.npmjs.com/package/mongodb-memory-server)
