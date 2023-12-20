import React from "react";
import { useState, useEffect } from "react";
import { getBanner } from "../../api";
import { Swiper, Toast, PullToRefresh, InfiniteScroll, List } from 'antd-mobile'
import { sleep } from 'antd-mobile/es/utils/sleep';

// 组件
import CardItem from "../../components/cardItem/cardItem";


export default function Recommend() {

    // 设为空值
    const [banner, setBanner] = useState([]);
    const [recommendList, setReCommendList] = useState([]);
    // 加载更多
    const [hasMore, setHasMore] = useState(true)

    const [requestCount, setRequestCount] = useState(10);
    const [direction, setDirection] = useState(1);
    // 第一次加载
    const [initialLoad, setInitialLoad] = useState(false);
    // 加载中
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData(requestCount, direction);
    }, [])

    // 获取数据
    const fetchData = (count, dir) => {
        if(loading){
            return;
        }

        setLoading(true);

        let data = {
            url: `${count - 10}/10`,
            data: ` direction=${dir}&request_count=${Number((count / 10).toFixed(0))} `
        };
        getBanner(data).then((res) => {
            console.log("res", res);
            let data = res.result;

            console.log('数据长度',data.list.length);

            console.log("data", data.banner);
            setBanner(data.banner);

            console.log("1", data.list.length);
            console.log("data.list", data.list);
            if (data.list.length > 0) {
                setReCommendList((prevList) => [...prevList, ...data.list]);
                setRequestCount((prevCount) => prevCount + data.list.length);
                setHasMore(true);
            } else {
                setHasMore(false);
            }
            setInitialLoad(true);
            setLoading(false);
        })
    }

    // 加载更多
    function loadMore() {
        if (!initialLoad || loading) {
            return; // 不触发触底加载
        }

        const newDirection = direction !== 1 ? 1 : 2;

        setDirection(newDirection);
        fetchData(requestCount, direction);

    }

    // 轮播图
    const bannerItems = banner.map((value, index) => (
        <Swiper.Item key={index} >
            <div onClick={() => {
                Toast.show(`你点击了卡片 ${index + 1}`)
            }}>
                <img src={value.i} width={375} alt="t" />
            </div>
        </Swiper.Item>
    ))

    // 组件数据


    return (
        <div>
            <PullToRefresh
                onRefresh={async () => {
                    await sleep(1000)
                    Toast.show('刷新成功')
                }}>
                {/* 轮播图 */}
                <div className="banner">
                    <Swiper
                        indicator={() => null}
                        loop
                        autoplay
                        style={{
                            '--border-radius': '10rem',
                            '--height': '110rem',
                        }}
                    >
                        {bannerItems}
                    </Swiper>
                </div>
                <div className="recommendList">

                    <List>
                        {
                            recommendList.map((value, index) => {
                                return <CardItem key={index} item={value} />
                            })
                        }
                        <InfiniteScroll initialLoad={false} loadMore={loadMore} hasMore={hasMore} />
                    </List>
                </div>
            </PullToRefresh>

            {/* <button onClick={() => dispatch(increment())}>+1</button> */}
        </div>
    )
}