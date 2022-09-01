import ProductList from "@/Components/Product/ProductList";
import Main from "@/Layouts/Main";
import React from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import IndexCarousel from "@/Components/Carousel/IndexCarousel";
import ArrowRight2Icon from "@/Components/Icon/ArrowRight2Icon";
import AwardsIcon from "@/Components/Icon/AwardsIcon";
import PersonHeart from "@/Components/Icon/PersonHeart";
import ThumbUp from "@/Components/Icon/ThumbUp";

function WhyCard(props) {
    const { icon: Icon, title, description } = props;
    return (
        <div className="flex items-center justify-center">
            <div className="p-4 bg-yellow-100 text-yellow-400">
                <Icon className="w-14 h-14" />
            </div>
            <div className="ml-4">
                <h1 className="text-lg font-semibold">{title}</h1>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
        </div>
    );
}

export default function Index(props) {
    return (
        <Main user={props.auth.user}>
            <Head />

            <div className="mt-7">
                <IndexCarousel />
            </div>

            <div className="mt-24">
                <div className="flex flex-col items-center">
                    <h1 className="font-semibold text-xl">
                        Why should choose this app?
                    </h1>
                    <p className="text-gray-500">why choose this app?</p>
                </div>
                <div className="mt-12 grid grid-cols-4">
                    <WhyCard
                        icon={AwardsIcon}
                        title="Awards 2042"
                        description="The best app in 2042"
                    />
                    <WhyCard
                        icon={PersonHeart}
                        title="Trusted"
                        description="Which is definitely reliable and very invincible"
                    />
                    <WhyCard
                        icon={ThumbUp}
                        title="1000% Ori"
                        description="Because this merchant is already space certified"
                    />
                    <WhyCard
                        icon={AwardsIcon}
                        title="Favorite Merchant"
                        description="Favorite in 2001 on the international Merchant Community"
                    />
                </div>
            </div>

            <div className="mt-32">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold text-gray-900">
                        Products
                    </h1>

                    <Link
                        href={route("products.index")}
                        className="flex items-center px-4 py-2 text-yellow-400 border border-1 border-yellow-400 rounded-full"
                    >
                        See More
                        <ArrowRight2Icon className="w-2.5 h-2.5 ml-2" />
                    </Link>
                </div>
                <ProductList products={props.products} />
            </div>
        </Main>
    );
}
