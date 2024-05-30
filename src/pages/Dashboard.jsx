import { useSelector } from "react-redux";
import { redirect } from "react-router-dom";

export const loader = (store) => () => {
  const user = store.getState().userState.user;
  if (!user) {
    return redirect("/landing")
  }
  return null;
}
const Dashboard = () => {

  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)

  return <div className={`mt-8 ${showSidebar ? 'w-[80vw]' : 'w-[100vw]'} px-8 h-[100vh] `
  }>
    <h2>Dashboard</h2>
  </div>
}
export default Dashboard