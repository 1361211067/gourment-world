import React, { useEffect, useState } from "react"
import { useLoaderData, useNavigate } from "react-router-dom"
import { NavBar, Space, Image, Avatar,Button } from 'antd-mobile'
import { MoreOutline } from 'antd-mobile-icons'
import './detail.css'

export default function Detail() {

    const navigate = useNavigate();

    const loaderData = useLoaderData();
    console.log('loaderData', loaderData);

    const [content, setContent] = useState(loaderData.content);

    useEffect(() => {
        setContent(loaderData.result.recipe);
    })

    // 导航栏右侧
    const right = (
        <div style={{ fontSize: 24 }}>
            <Space style={{ '--gap': '16px' }}>
                <MoreOutline />
            </Space>
        </div>
    )

    // 返回
    const back = () => {
        navigate(-1);
    };

    return (
        <div className="detailPage">
            {/* 顶部导航 */}
            <div className="detailHeader">
                <NavBar right={right} onBack={back}>
                </NavBar>
            </div>

            <div className="detailContentBox">
                {/* 图片 */}
                <div className="detailImg">
                    <Image src={content?.thumb_path} fit='fill' />
                </div>
                <div className="ContentBox">
                    {/* 内容 */}
                    <div className="detailContent">
                        <p className="detailTitle">{content?.title}</p>
                        <div className="viewAndCollect">
                            <p>浏览 {content?.views_count_text} · 收藏 {content?.favo_counts}</p>
                        </div>
                        <div className="authorInfo">
                            <div className="left">
                                {/* 头像 */}
                                <div className="authorImg">
                                    <Avatar src={content?.user?.avatar_medium} style={{ '--border-radius': '50%' }} />
                                </div>
                                <p className="authorName">{content?.user?.nickname}</p>
                                <p className="authorLevel">LV.{content?.user?.lvl}</p>

                            </div>
                            <div className="right">
                                <Button size='small' shape='rounded' color='primary' fill='outline'>
                                    关注
                                </Button>
                            </div>
                        </div>
                        {/* 描述,介绍 */}
                        <div className="desc">
                            {content?.cookstory}
                        </div>
                        {/* 食材清单 */}
                        <div className="foodsList">
                            <p className="foodTitle">食材清单</p>
                            <div className="ingredients">{
                                content?.major.map((value, index) => {
                                    return (
                                        <div className="majorList" key={index}>
                                            <div className="left">{value.title}</div>
                                            <div className="right">{value.note}</div>
                                        </div>
                                    )
                                })
                            }</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}