import React from "react";
import styled from "styled-components";

const NoScrollBar = styled("div")`
    /* Hide scrollbar for Chrome, Safari and Opera */
    &::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
`;

export default function Alert({ alerts, setAlerts }) {
    const handleRemove = (i) => {
        return (e) => {
            e.preventDefault();
            const newAlerts = [...alerts];
            newAlerts.splice(i, 1);
            setAlerts(newAlerts);
        };
    };
    return (
        <NoScrollBar className="max-h-32 mb-3 overflow-auto">
            {alerts.map((alert, i) => (
                <div
                    className={`bg-${alert.color}-100 border border-${alert.color}-400 text-${alert.color}-700 px-4 py-3 rounded relative mb-3`}
                    role="alert"
                    key={i}
                >
                    <strong className="font-bold">{alert.title}</strong>
                    <span className="block sm:inline ml-2">
                        {alert.message}
                    </span>
                    <button
                        className="absolute top-0 bottom-0 right-0 px-4 py-3"
                        onClick={handleRemove(i)}
                    >
                        <svg
                            className={`fill-current h-6 w-6 text-${alert.color}-500`}
                            role="button"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <title>Close</title>
                            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                        </svg>
                    </button>
                </div>
            ))}
        </NoScrollBar>
    );
}
