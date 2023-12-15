// import logo from './logo.svg';
import './App.css';
import BottomTab from "./components/bottomTab";
import { Outlet } from "react-router-dom";

function App() {

  return (
    <div className="App">
      {/* 路由出口 */}
      <Outlet />
      {/* 底部导航 */}
      <BottomTab></BottomTab>
    </div>
  );
}

export default App;
