import Main from "@/Layouts/Main";
import React from "react";
import moment from "moment/moment";
import { Head } from "@inertiajs/inertia-react";

export default function Show(props) {
    const { transaction } = props;
    return (
        <Main user={props.auth.user}>
            <Head title="Detail Transaction" />
            <h1>Detail Transaksi</h1>

            <div>
                <p>
                    Tanggal Transaksi:{" "}
                    {moment(transaction.created_at).format("DD MMMM YYYY")}
                </p>
                <p>Total {transaction.total_price}</p>
                <p>alamat: {transaction.address}</p>
                <h3>barang</h3>
                {transaction.per_merchant_transactions.map(
                    (per_merchant_transaction, index) => (
                        <div key={index}>
                            <p>
                                nama merchant :
                                {per_merchant_transaction.merchant.name}
                            </p>
                            <p>
                                total merchant :
                                {per_merchant_transaction.total_price}
                            </p>

                            {per_merchant_transaction.orders.map(
                                (order, index) => (
                                    <div key={index}>
                                        <p>
                                            nama product: {order.product.name}
                                        </p>
                                        <p>harga : {order.price}</p>
                                        <p>banyak produk: {order.quantity}</p>
                                    </div>
                                )
                            )}
                        </div>
                    )
                )}
            </div>
        </Main>
    );
}
