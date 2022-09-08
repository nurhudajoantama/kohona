import { Head } from "@inertiajs/inertia-react";
import React from "react";
import { usePage } from "@inertiajs/inertia-react";
import SchemaOrg from "./SchemaOrg";

export default function Seo({ title, description, image }) {
    const page = usePage();
    const url = page.props.ziggy.url + page.url;
    const imagePage = image || "/assets/images/icon.png";
    const twitter = "Kohona";

    return (
        <Head title={title}>
            {/* General tags */}
            <meta name="description" content={description} />
            <meta name="image" content={imagePage} />

            <link rel="canonical" href={url} />

            {/* OpenGraph tags */}
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={imagePage} />

            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content={twitter} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imagePage} />

            <SchemaOrg url={url} title={title} defaultTitle="Kohona" />
        </Head>
    );
}
