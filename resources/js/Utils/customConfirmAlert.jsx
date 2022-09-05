import React from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export function customConfirmAlert({ title, message }) {
    return new Promise((resolve, reject) => {
        confirmAlert({
            title,
            message,
            customUI: ({ onClose }) => {
                return (
                    <div className="w-96 py-8 px-14 bg-white border border-gray-200 rounded-md flex flex-col items-center">
                        <h1 className="font-semibold">{title}</h1>
                        <p className="mt-1 text-sm">{message}</p>
                        <div className="flex mt-7">
                            <button
                                className="mr-5 px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                                onClick={() => {
                                    onClose();
                                }}
                            >
                                No
                            </button>
                            <button
                                className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
                                onClick={() => {
                                    resolve();
                                    onClose();
                                }}
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                );
            },
        });
    });
}
