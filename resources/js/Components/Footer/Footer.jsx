import { Link } from "@inertiajs/inertia-react";
import React from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import FacebookFill from "@/Components/Icon/FacebookFill";
import InstagramFilled from "@/Components/Icon/InstagramFilled";
import TwitterFill from "@/Components/Icon/TwitterFill";
import YoutubeFill from "@/Components/Icon/YoutubeFill";
import LogoGooglePlayStore from "../Icon/LogoGooglePlayStore";
import AppleFilled from "../Icon/AppleFilled";

function FooterLink(props) {
    return (
        <Link
            className="block mt-1 hover:underline"
            href={props.href}
            {...props}
        >
            {props.children}
        </Link>
    );
}

function IconLink(props) {
    return (
        <Link {...props}>
            <props.Icon className="p-2 mr-1 h-12 w-12" />
        </Link>
    );
}

export default function Footer() {
    return (
        <div className="mt-40 bg-yellow-400 text-white py-12">
            <div className="max-w-7xl mx-auto grid grid-cols-4 gap-12">
                <div className="col-span-2">
                    <div className="flex items-center">
                        <ApplicationLogo />
                        <h3 className="ml-3 text-3xl font-semibold">Kohona</h3>
                    </div>
                    <div className="bg-white text-yellow-400 px-8 py-7 rounded-lg mt-5 flex justify-between items-center">
                        <h4 className="text-2xl font-semibold">
                            Join to our Merchant
                        </h4>
                        <Link href="/merchants/register">
                            <button className="bg-yellow-400 px-7 py-1.5 rounded-md text-white">
                                Join Now
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="ml-7">
                    <h3 className="text-xl font-semibold">Kohona</h3>
                    <div className="mt-3">
                        <FooterLink href="/">Home</FooterLink>
                        <FooterLink href="/products">Products</FooterLink>
                        <FooterLink href="/transactions">
                            Transactions
                        </FooterLink>
                        <FooterLink href="/carts">Carts</FooterLink>
                    </div>
                </div>
                <div>
                    <div>
                        <h4 className="text-lg">Cari tau berita terbaru</h4>
                        <div className="flex mt-1">
                            <IconLink Icon={FacebookFill} />
                            <IconLink Icon={InstagramFilled} />
                            <IconLink Icon={TwitterFill} />
                            <IconLink Icon={YoutubeFill} />
                        </div>
                    </div>
                    <div className="mt-5">
                        <h4 className="text-lg">Unduh Aplikasi</h4>
                        <div className="flex mt-1">
                            <IconLink Icon={LogoGooglePlayStore} />
                            <IconLink Icon={AppleFilled} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-14">
                <p>Copyright &copy; Kohona 2022. All rights reserved</p>
            </div>
        </div>
    );
}
