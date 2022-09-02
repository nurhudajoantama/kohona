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
        <NoScrollBar className="fixed bottom-1 right-3 w-96 max-h-32 mb-3 overflow-auto">
            {alerts.map((alert, i) => {
                let className =
                    "flex justify-between items-center border px-4 py-3 rounded relative mb-3 ";
                switch (alert.color) {
                    case "red":
                        className +=
                            "bg-red-100 border border-red-400 text-red-700";
                        break;
                    case "yellow":
                        className +=
                            "bg-yellow-100 border border-yellow-400 text-yellow-700";
                        break;
                    default:
                        className +=
                            "bg-green-100 border border-green-400 text-green-700";
                }

                return (
                    <div key={i} className={className}>
                        <div>
                            <h5 className="font-bold text-sm">{alert.title}</h5>
                            <p className="text-sm">{alert.message}</p>
                        </div>
                        <button className="p-1" onClick={handleRemove(i)}>
                            <svg
                                className={`fill-current h-5 w-5 text-${alert.color}-500`}
                                role="button"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <title>Close</title>
                                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                            </svg>
                        </button>
                    </div>
                );
            })}
        </NoScrollBar>
    );
}
