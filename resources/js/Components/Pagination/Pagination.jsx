import React from "react";
import { Link } from "@inertiajs/inertia-react";

export default function Pagination(props) {
    const { links, from, to, total, last_page, className } = props;
    if (last_page === 1) return <></>;
    return (
        <div className={`mt-3 ${className}`}>
            <p className="text-gray-600 text-sm">
                Showing {from} to {to} of {total} result
            </p>
            <div className="flex mt-0.5">
                <div className="flex items-center border-t border-b rounded-md border-yellow-100 overflow-hidden bg-yellow-400 text-white">
                    {links.map((link, i) => (
                        <Link
                            key={i}
                            className={`py-1 px-3 border-r border-l border-yellow-100 ${
                                link.active && "bg-yellow-300"
                            }`}
                            href={link.url}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        ></Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
