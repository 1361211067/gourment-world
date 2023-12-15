import React from "react";
import { useState } from "react";
import { Badge, TabBar } from 'antd-mobile'
import {
    TextOutline,
    BellOutline,
    CompassOutline,
    UserOutline,
} from 'antd-mobile-icons'

import {
    useNavigate,
} from 'react-router-dom'

import './bottomTab.css'

export default function BottomTab() {
    const tabs = [
        {
            key: 'home/recommend',
            title: '菜谱',
            icon: <TextOutline />,
            badge: Badge.dot,
        },
        {
            key: 'note',
            title: '笔记',
            icon: <CompassOutline />,
            badge: '5',
        },
        {
            key: 'message',
            title: '消息',
            icon: <BellOutline />,
            badge: '99+',
        },
        {
            key: '/mine',
            title: '我的',
            icon: <UserOutline />,
        },
    ]

    const [activeKey, setActiveKey] = useState('home/recommend');
    const navigte = useNavigate();

    const setRouteActive = (value) => {
        navigte(value);
        setActiveKey(value);
    }

    return (
        <div className="bottomTab">
            <TabBar activeKey={activeKey} onChange={setRouteActive}>
                {tabs.map((item, index) => (
                    <TabBar.Item
                        key={item.key}
                        icon={item.icon}
                        title={item.title}
                        badge={item.badge}
                    />

                ))}
            </TabBar>
        </div>
    )
}



/**

<div className="bottomTab">
            <TabBar activeKey={activeKey} onChange={setActiveKey}>
                {tabs.map((item,index) => (
                    <TabBar.Item
                        key={item.key}
                        icon={item.icon}
                        title={item.title}
                        badge={item.badge}
                    />
                    
                ))}
            </TabBar>
        </div>
**/