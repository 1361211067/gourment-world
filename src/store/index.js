import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice'

// import { counterSlice } from './counterSlice';

// 创建项目唯一的 store 对象作为参数
const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
})

export default store;