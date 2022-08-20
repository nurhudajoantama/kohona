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
            className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity ${
                modalOpen
                    ? "transition ease-out duration-200 opacity-100 block"
                    : "transition ease-out duration-100 opacity-0 hidden"
            }`}
        >
            <div className="w-full flex justify-center items-center mt-44">
                <div
                    ref={modalContent}
                    className="bg-white overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg px-5 py-2"
                >
                    <div className="flex justify-end">
                        <button
                            className="border py-0.5 px-2 rounded-md border-gray-300"
                            onClick={() => setModalOpen(false)}
                        >
                            X
                        </button>
                    </div>
                    {children}
                </div>
            </div>
            <section
                className="w-screen h-full cursor-pointer fixed"
                onClick={() => {
                    setModalOpen(false);
                }}
            ></section>
        </main>
    );
}
