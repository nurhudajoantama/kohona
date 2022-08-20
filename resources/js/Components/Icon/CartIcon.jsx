import React from "react";

export default function CartIcon(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
            {...props}
        >
            <path
                fill="currentColor"
                d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.994 1.994 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921z"
            />
            <circle cx="10.5" cy="19.5" r="1.5" fill="currentColor" />
            <circle cx="17.5" cy="19.5" r="1.5" fill="currentColor" />
        </svg>
    );
}
