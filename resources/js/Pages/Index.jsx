import Main from "@/Layouts/Main";
import React from "react";

export default function Index(props) {
    return (
        <Main user={props.auth.user}>
            <div>Index</div>
        </Main>
    );
}
