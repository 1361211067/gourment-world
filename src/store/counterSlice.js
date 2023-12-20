import { createSlice } from '@reduxjs/toolkit';
// 创建slice   包含了state（初始值） + reducer
// reducer 函数  定义如何更新 state


export const counterSlice = createSlice({
    // 标识
    // 开发者工具调试的标识
    name: 'counter',
    // 初始值存放
    initialState: {
        // 初始值
        num: 1,
        
        
    },
    // 所有改变state的方法
    reducers: {
        // action 某个改变state状态的方法
        increment: (state) => {
            state.num += 1
        },
        decrement: (state) => {
            state.num -= 1
        },
        incrementByAmount: (state, action) => {
            state.num = action.payload
        },

    }
})

// 为每个case reducer 函数生成对应的action
export const {
    increment,
    decrement,
    incrementByAmount,
} = counterSlice.actions

//导出reducer对象
export default counterSlice.reducer;