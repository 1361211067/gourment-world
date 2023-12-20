import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Tabs, SearchBar } from 'antd-mobile';
import { getTabs, getHotSearch } from '../../api';
import { AppstoreOutline } from 'antd-mobile-icons'
import './home.css';

export default function Home() {

    const [activeKey, setActiveKey] = useState('');
    const navigte = useNavigate();

    // 点击导航栏进行跳转
    const setRouteActive = (value) => {
        // console.log("你点击的是", value);
        navigte(value);
        setActiveKey(value);
    }
    // 动态渲染顶部导航
    const [tabs, setTabs] = useState([]);
    // 热搜
    const [hotSearch, setHotSearch] = useState([]);

    useEffect(() => {
        // 获取顶部导航栏
        getTabs().then((res) => {
            // console.log("tabs", res);
            // console.log("xxx", res.result.hometabs.tabs);

            const temp = res.result.hometabs.tabs.map((item, index) => ({
                ...item,
                key: index === 1 ? '' : item.id,
            }));
            setTabs(temp);

            // console.log("tabs", tabs);
        })
        // 获取热搜
        getHotSearch().then((res) => {
            // console.log("热搜",res);
            let randNum = Math.floor(Math.random() * (res.result.search_terms.length - 1));
            // console.log(randNum);
            setHotSearch(res.result.search_terms[randNum]);
        })

    }, []);

    return (
        <div>
            {/* 顶部搜索框 */}
            <div className='searchBox'>

                <div className="leftBox" onClick={() => navigte('/search')}>
                    <SearchBar placeholder={hotSearch.search_text} />
                </div>
                <div className='rightBox'>
                    <div className='icon'>
                        <AppstoreOutline />
                    </div>
                </div>
            </div>
            {/* 顶部通用 */}
            <Tabs activeKey={activeKey} onChange={setRouteActive}>
                {tabs.map((item, index) => (
                    <Tabs.Tab title={item.title} key={item.key} />
                ))}
            </Tabs>
            {/* 底部其他页面 */}
                <div>
                    <Outlet />
                </div>
        </div>
    )
}
