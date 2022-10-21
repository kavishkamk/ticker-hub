## This is a application based on Micro Services Architecture

### Setup secrets

- Add JWT key as a secret in kubernete cluster
     - replace ["Value"] with JWT_KEY
```
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=["Value"]
```


### Project Details

- Micro Service Architecture
- Based on TypeScript, Node.js, Express, mongoDB
- Docker for impliment services ([ Docker Desktop](https://www.docker.com/products/docker-desktop/) on Windows 11)
- Kubernetes for manage Containers [ (Minikube) ](https://minikube.sigs.k8s.io/docs/)
- impliment deployments and services [ (/infra/k8s/*) ](https://github.com/kavishkamk/ticket-hub/tree/main/infra/k8s)
- set Cluster IP for commnication between pods [ (/infra/k8s/*) ](https://github.com/kavishkamk/ticket-hub/tree/main/infra/k8s)
- set Loadbalancer using [ "Ingress-Nginx" ](https://github.com/kubernetes/ingress-nginx)
- use [ dockerhub ](https://hub.docker.com/) to handle images
- use [mongo](https://hub.docker.com/_/mongo) image from [docker hub]((https://hub.docker.com/search?q=)) to impliment mongodb
- [ Skaffold ](https://skaffold.dev/) for automate development process [ (./skaffold.yaml) ](https://github.com/kavishkamk/ticket-hub/blob/main/skaffold.yaml)
- Distribute Credentials Securely Using Secrets in kubernetes cluster 
    - kubectl create secret generic ["Secret Name"] --from-literal=["Key Name"]=["Key Value"]

## Services

### [auth](https://github.com/kavishkamk/ticket-hub/blob/main/auth/README.md)

- Autentication and Autherization ([auth service](https://github.com/kavishkamk/ticket-hub/tree/main/auth))
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

### auth-mongo

- use [mongo](https://hub.docker.com/_/mongo) image from [dockerhub](https://hub.docker.com/search?q=) to deploy [auth-mongo](https://github.com/kavishkamk/ticket-hub/blob/main/infra/k8s/auth-mongo-depl.yaml) service