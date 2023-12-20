// import logo from './logo.svg';
import './App.css';
import BottomTab from "./components/bottomTab/bottomTab";
import { Outlet } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <div className="box">
        {/* 路由出口 */}
        <Outlet />
      </div>
      {/* 底部导航 */}
      <BottomTab ></BottomTab>
    </div>
  );
}

export default App;
