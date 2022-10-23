import Router from "next/router";
import { useEffect } from "react";

import useRequest from "../../hooks/use-request";

const Signout = () => {

    const { sendRequest, error } = useRequest();

    useEffect(() => {
        const logout = async () => await sendRequest({
            url: "/api/users/signout",
            method: "post",
            body: {},
            onSuccess: () => Router.push("/")
        });
        logout();
    }, []);

    return <h1>Singing you out....</h1>
};

export default Signout;