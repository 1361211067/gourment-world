import React from "react";

// 组件
import App from "../App";
import Home from "../view/Home/home";
import Mine from "../view/Mine/mine";
import Message from "../view/Message/message";
import Note from "../view/Note/note";
import Video from "../view/Home/video";
import Recommend from "../view/Home/recommend";

import {
    createBrowserRouter,
} from "react-router-dom";

export const tabs = [
    {
        key: "home",
        title: "菜谱",
        icon: "home",
    },
    {
        key: "mine",
        title: "我的",
        icon: "mine",
    }
]


export default createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "home",
                element: <Home />,
                children: [
                    {
                        path: "/home/recommend",
                        element: <Recommend />,
                    },
                    {
                        path: "/home/video",
                        element: <Video />,
                    }
                ]
            },
            {
                path: "message",
                element: <Message />,
            },
            {
                path: "note",
                element: <Note />,
            },
            {
                path: "mine",
                element: <Mine />,
            }
        ]
    }
], {
    initialPath: "home/recommend",
})