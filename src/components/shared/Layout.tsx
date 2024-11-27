import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <div className="bg-indigo-500">Sidebar</div>
      <div className="bg-indigo-300">Header</div>
      <div className="">{<Outlet />}</div>
      <p>footer</p>
    </div>
  );
};

export default Layout;