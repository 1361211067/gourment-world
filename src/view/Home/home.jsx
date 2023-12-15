import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Home() {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/home/recommend">推荐</Link>|
                    <Link to="/home/video">视频</Link>|
                </li>
            </ul>
            <div>
                主页
                <Outlet />
            </div>
        </div>
    )
}