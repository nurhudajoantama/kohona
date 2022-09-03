import React from "react";
import TimesIcon from "../Icon/TimesIcon";
import { types } from "react-alert";

export default function AlertTemplate(props) {
    const { style, options, message, close } = props;

    let bodyClass =
        "flex bg-white border-l-2 box-border justify-between items-center p-2 ";
    switch (options.type) {
        case types.SUCCESS:
            bodyClass += "border-green-500";
            break;
        case types.ERROR:
            bodyClass += "border-red-500";
            break;
        case types.INFO:
        default:
            bodyClass += "border-blue-500";
            break;
    }

    return (
        <div style={{ ...style }} className={bodyClass}>
            <p className="text-sm mx-4 capitalize">{message}</p>
            <button onClick={close}>
                <TimesIcon className="h-5 w-5 text-gray-500" />
            </button>
        </div>
    );
}
