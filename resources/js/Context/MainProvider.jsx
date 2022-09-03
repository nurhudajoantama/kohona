import React from "react";
import AlertProvider from "./AlertProvider";

export default function MainProvider(props) {
    const { children } = props;
    return (
        <>
            <AlertProvider>{children}</AlertProvider>
        </>
    );
}
