// preconfigured request that check the request come from server or browser and direct it accourding to that

import axios from "axios";

const buildClient = ({ req }) => {
    if (typeof window === "undefined") {
        return axios.create({
            baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
            headers: req.headers
        });
    } else {
        return axios.create({
            baseURL: "/"
        });
    }
};

export default buildClient;