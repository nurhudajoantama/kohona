import React from "react";
import NumberFormat from "react-number-format";

export default function PriceFormat(props) {
    return (
        <NumberFormat
            displayType={"text"}
            thousandSeparator="."
            decimalSeparator=","
            prefix={"Rp. "}
            {...props}
        />
    );
}
