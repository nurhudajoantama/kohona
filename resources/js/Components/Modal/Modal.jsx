import React, { useRef, useEffect } from "react";

export default function Modal({ modalOpen, setModalOpen, children }) {
    const modalContent = useRef(null);

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!modalOpen || keyCode !== 27) return;
            setModalOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    return (
        <main
            className={`w-full fixed inset-0 bg-slate-600 bg-opacity-30 z-50 transition-opacity cursor-pointer flex justify-center ${
                modalOpen
                    ? "transition ease-out duration-200 opacity-100 block"
                    : "transition ease-out duration-100 opacity-0 hidden"
            }`}
            onClick={() => {
                setModalOpen(false);
            }}
        >
            <div className="w-full flex justify-center items-center">
                <div
                    ref={modalContent}
                    className="bg-white overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg px-5 py-2"
                >
                    {/* Search form */}
                    {children}
                </div>
            </div>
        </main>
    );
}
