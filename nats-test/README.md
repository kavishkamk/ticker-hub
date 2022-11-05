# This is test service for test NATS Streaming Server

- to use the program to connect to the NATS-Streaming-server used port forwarding
```
    kubectl port-froward [nats-pod id] 4222:4222
```

- use [NATS Streaming Server](https://docs.nats.io/)
- deployment([./infra/k8s/tickets-depl.yaml](https://github.com/kavishkamk/ticket-hub/blob/main/infra/k8s/nats-depl.yaml)) using [nats-setreaming](https://hub.docker.com/_/nats-streaming) docker image
- [node-nats-streaming](https://www.npmjs.com/package/node-nats-streaming) for connect with NATS Streaming Server
- setup publisher and listner services
- setup queue groups for scale services
- set manual ack mood for avoid missing events
- Tust durable subscription