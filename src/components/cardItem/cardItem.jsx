import React ,{useRef,useEffect} from 'react';
import { MoreOutline, StarOutline } from 'antd-mobile-icons'
import {useNavigate} from 'react-router-dom'
import './cardItem.css'

export default function CardItem(props) {

    const navigate = useNavigate();

    const videoRef = useRef(null);

    // console.log("props",props);
    let value = props.item?.r;
    console.log("props", props);
    console.log("value", value);
    // console.log("value",value?.img);

    // 监听是否处于视图范围，是则播放视频
    useEffect(() => {
        const ob = new IntersectionObserver((entries) => {
            const video = entries[0].target;
            if (entries[0].isIntersecting) {
                video.play().catch(error => {
                    console.error('Failed to play video:', error);
                  });
            } else{
                video.pause();
            }
        }, {
            threshold: 0.9,//当视频不完整时就暂停播放
        });

        if(videoRef.current){
            ob.observe(videoRef.current);
        }
        return () => {
            if(videoRef.current){
                ob.unobserve(videoRef.current);
            }
        }
    },[]);

    

    // 检测是否在视图范围
  const handleScroll = () => {
    const videos = document.querySelectorAll('.video');
    const windowHeight = window.innerHeight;
    const windowMiddle = windowHeight / 2 + window.pageYOffset;

    videos.forEach((video) => {
      const rect = video.getBoundingClientRect();
      const videoTop = rect.top + window.pageYOffset;
      const videoBottom = videoTop + rect.height;
      
      if (videoTop <= windowMiddle && videoBottom >= windowMiddle) {
        video.classList.add('active');
      } else {
        video.classList.remove('active');
      }
    });
  };
//   监听滚动
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
    return (
        <div className='card'>
            <div>
                {props.item?.type === 1 ? (
                    <div onClick={() => { navigate( `/detail/${value?.id}` ) }}>
                        <div className="authorBox">
                            <div className="author">
                                <img src={value?.a?.p} alt="" />
                                <span>{value?.a?.n}</span>
                                <span>LV.{value?.a?.lvl}</span>
                            </div>
                            <div className='more'>
                                <MoreOutline />
                            </div>
                        </div>
                        <div className='content'>
                            {value?.vu !== "" ? (
                                // 有视频
                                <div className='videoContent'>
                                    <div className='video'>
                                        <video muted ref={videoRef} src={value?.vu} controls width={355}></video>
                                    </div>
                                    <div className='textContent'>
                                        <div className='collectionBox'>
                                            <div className="left">
                                                {(value?.fc / 10000) - 1 > 0 ? (value?.fc / 10000).toFixed(1) + "万" : value?.fc}人收藏
                                            </div>
                                            <div className="right">
                                                <StarOutline />
                                            </div>
                                        </div>
                                        <div className='desc'>
                                            {value?.n}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // 没有视频
                                <div className='imgContent'>
                                    <div className='img'>
                                        <img src={value?.img} alt="" />
                                    </div>
                                    <div className='textContent'>
                                        <div className='collectionBox'>
                                            <div className="left">
                                                {(value?.fc / 10000) - 1 > 0 ? (value?.fc / 10000).toFixed(1) + "万" : value?.fc}人收藏
                                            </div>
                                            <div className="right">
                                                <StarOutline />
                                            </div>
                                        </div>
                                        <div className='desc'>
                                            {value?.n}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : null}
            </div>
        </div >
    )
}