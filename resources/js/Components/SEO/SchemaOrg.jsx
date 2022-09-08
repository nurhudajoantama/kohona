import React from "react";

export default function SchemaOrg({ title, defaultTitle, url }) {
    const schema = [
        {
            "@context": "http://schema.org",
            "@type": "WebSite",
            url,
            name: title,
            alternateName: defaultTitle,
        },
    ];
    return (
        <>
            {/* Schema.org tags */}
            <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </>
    );
}
