import React from "react";

export default function AdProduct(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 48 48"
            {...props}
        >
            <g
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="4"
            >
                <path d="M44 14L24 4L4 14V34L24 44L44 34V14Z" />
                <path stroke-linecap="round" d="M4 14L24 24" />
                <path stroke-linecap="round" d="M24 44V24" />
                <path stroke-linecap="round" d="M44 14L24 24" />
                <path stroke-linecap="round" d="M34 9L14 19" />
            </g>
        </svg>
    );
}
