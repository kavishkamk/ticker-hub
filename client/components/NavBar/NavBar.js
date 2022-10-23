import React from "react";

import Button from "../shared/Button";

const NavBar = ({ currentUser }) => {
    return (
        <React.Fragment>
            <div className="flex px-4 bg-wild-sand py-4 relative drop-shadow-xl">
                <div className="text-2xl">KV</div>
                <div className="flex ml-auto">
                    {!currentUser && <Button href="/auth/signup" title="SignUp" />}
                    {!currentUser && <Button href="/auth/signin" title="SignIn" />}
                    {currentUser && <Button href="/auth/signout" title="SignOut" />}
                </div>
            </div>
        </React.Fragment>
    );
};

export default NavBar;