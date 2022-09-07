import React from "react";
import ReactDOMServer from "react-dom/server";
import { createInertiaApp } from "@inertiajs/inertia-react";
import createServer from "@inertiajs/server";
import route from "../../vendor/tightenco/ziggy/dist/index.m";
import MainProvider from "./Context/MainProvider";

const appName = "Kohona";

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) => require(`./Pages/${name}`),
        setup: ({ App, props }) => {
            global.route = (name, params, absolute) =>
                route(name, params, absolute, {
                    ...page.props.ziggy,
                    location: new URL(page.props.ziggy.location),
                });
            return (
                <MainProvider>
                    <App {...props} />
                </MainProvider>
            );
        },
    })
);
