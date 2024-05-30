import { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigation } from "react-router-dom";
import { Loading, Navbar, SidebarContainer } from "../components/index";
export const loader = (store) => () => {
  const user = store.getState().userState.user;
  if (!user) {
    return redirect("/landing")
  }
  return null;
}

const HomeLayout = () => {
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const navigation = useNavigation();
  const isLoading = navigation.state === 'submitting'

  window.addEventListener('resize', function () {
    const width = this.innerWidth;
    if (width <= 1092) {
      setIsSmallScreen(!isSmallScreen)
    }
  })
  return <main className={`flex `}>
    <div className={` ${showSidebar ? 'w-80  ' : 'w-0 '} overflow-y-scroll no-scrollbar duration-300 `}>
      <SidebarContainer />
    </div>
    <div className={`w-full flex flex-col`} >
      <Navbar />
      <div className={`flex bg-red-100  min-h-[100vh] max-h-[1170px] sticky top-20  overflow-y-scroll no-scrollbar `}>{
        isLoading ?
          <Loading /> : <Outlet />
      }
      </div>
    </div>
  </main>
}
export default HomeLayout;