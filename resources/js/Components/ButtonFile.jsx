import React from "react";

export default function ButtonFile({ children, ...props }) {
    return (
        <div className="overflow-hidden rounded-md relative w-full mb-4 bg-gray-400">
            <button
                type="button"
                className="bg-indigo hover:bg-indigo-dark text-white font-bold py-2 px-4 w-full inline-flex items-center"
            >
                <span className="mx-auto">{children}</span>
            </button>
            <input
                className="cursor-pointer absolute block opacity-0 inset-0 h-full w-full z-50"
                type="file"
                required
                {...props}
            />
        </div>
    );
}
