import React from "react";
import styled from "styled-components";
import Navbar from "@/Components/Navbar/Navbar";

const Bg = styled("div")`
    background: url(${(props) => props.image || "none"});
    background-size: cover;
`;

export default function Detail(props) {
    const { children } = props;
    return (
        <Bg image="/assets/images/bg-detail.png" className="min-h-screen">
            <Navbar />
            <div className="max-w-5xl mx-auto mt-12 border rounded-xl bg-white shadow-md overflow-hidden">
                {children}
            </div>
        </Bg>
    );
}
