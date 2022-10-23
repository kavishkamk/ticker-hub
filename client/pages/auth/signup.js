import { useState } from "react";
import { useRouter } from 'next/router';

import useRequest from "../../hooks/use-request";

const SignupFrom = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { sendRequest, error } = useRequest();
    const router = useRouter()

    const onSubmit = async event => {
        event.preventDefault();

        await sendRequest({
            url: "../api/users/signup",
            method: "post",
            body: {
                email,
                password
            },
            onSuccess: () => router.push("/")
        });
    };

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign Up</h1>
            <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" />
            </div>
            {error}
            <button className="btn btn-primary">Sign Up</button>
        </form>
    );
};

export default SignupFrom;