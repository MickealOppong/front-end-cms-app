import { LuLayoutDashboard } from "react-icons/lu";
import { useSelector } from "react-redux";
import { links, settingsMenu } from "../util/data";
import MenuItem from "./MenuItem";
import SectionTitle from "./SectionTitle";

const SmallSidebar = () => {
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)


  return <section>
    <nav className={`flex items-center h-20 bg-white  fixed top-0 border-r-2 w-[20vw]`} >
      <h2 className=" px-8 text-3xl text-c4 font-bold">pay.co</h2>
    </nav>
    <aside className="flex flex-col p-8 mt-20 w-[20vw] border-r-2 min-h-[100vh]">
      <div className="flex flex-col">
        <div className="">
          <SectionTitle title='main home' style='uppercase text-xs text-gray-400 mb-4 font-semibold' />
        </div>
        <div className="capitalize tracking-tight flex items-center text-md gap-x-2 font-semibold font-mono">
          <LuLayoutDashboard />
          <h2>dashboard</h2>
        </div>
      </div>
      <div className="flex flex-col mt-10">
        <SectionTitle title='all pages' style='uppercase text-xs text-gray-400 mb-4 font-semibold' />
        <div className="flex flex-col gap-y-4 cursor-pointer">
          {
            links.map((link) => {
              return <MenuItem {...link} key={link.id} />
            })
          }
        </div>
      </div>
      <div className="mt-10">
        <SectionTitle title='settings' style='uppercase text-xs text-gray-400 mb-4 font-semibold' />
        {
          settingsMenu.map((item) => {
            return <MenuItem {...item} key={item.id} />
          })
        }
      </div>
    </aside>
  </section>
}
export default SmallSidebar;