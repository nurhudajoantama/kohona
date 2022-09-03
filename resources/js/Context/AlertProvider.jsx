import React from "react";
import { transitions, positions, Provider } from "react-alert";
import AlertTemplate from "@/Components/Alert/AlertTemplate";

const options = {
    position: positions.BOTTOM_RIGHT,
    timeout: 5000,
    offset: ".5rem",
    transitions: transitions.FADE,
    containerStyle: {
        marginBottom: "1rem",
    },
};

export default function AlertProvider({ children }) {
    return (
        <Provider template={AlertTemplate} {...options}>
            {children}
        </Provider>
    );
}
