import axios from "axios"
import { useState } from "react";

const useRequest = () => {

    const [error, setError] = useState(null);

    const sendRequest = async ({ url, method, body, onSuccess }, props = {}) => {
        await axios[method](url, { ...body, ...props })
            .then(respone => {
                setError(null);

                if (onSuccess) {
                    onSuccess(respone.data);
                }

                return respone.data;
            }).catch(error => {
                setError(
                    <div className="alert alert-danger">
                        <h4>Opps...</h4>
                        <ul className="my-0">
                            {error.response.data.errors.map((err, index) => (
                                <li key={index}>{err.message}</li>
                            ))}
                        </ul>
                    </div>);
            });
    };

    return { sendRequest, error };

};

export default useRequest;