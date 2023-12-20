import React from "react";

// 组件
import App from "../App";
import Home from "../view/Home/home";
import Mine from "../view/Mine/mine";
import Message from "../view/Message/message";
import Note from "../view/Note/note";
import Search from "../view/Search/search";
import Video from "../view/Home/video";
import Recommend from "../view/Home/recommended";
import Detail from "../view/Detail/detail";
import NoFundPage from "../view/noFundPage";

import { getDetail } from "../api/index";

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

function getDetailData(id) {
    return getDetail(id);
}

export default createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />,
                children: [
                    {
                        path: "",
                        element: <Recommend />,
                    },
                    {
                        path: "/videos",
                        element: <Video />,
                    }
                ]
            },
            {
                path: "search",
                element: <Search />,
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
            },

        ]
    },
    {
        path: 'detail/:id',
        element: <Detail />,
        loader: async (obj) => {
            console.log('先执行loader函数', obj.params.id);
            const data = await getDetailData(obj.params.id);
            return data;
        }
    },
    {
        path: "*",
        element: <NoFundPage />
    }
], {
    initialPath: "home/recommended",
})