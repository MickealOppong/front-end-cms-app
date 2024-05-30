import { useSelector } from "react-redux";
import { dashboardMenu, links, settingsMenu } from "../util/data";
import MenuItem from "./MenuItem";
import SectionTitle from "./SectionTitle";

const Sidebar = () => {
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)

  return <section className="w-80  ">
    <aside className="flex flex-col p-8 mt-20 min-h-[100vh]">
      <div className="flex flex-col">
        <div className="">
          <SectionTitle title='main home' style='uppercase text-xs text-gray-400 mb-4 font-semibold' />
          <div className="flex flex-col gap-y-4 cursor-pointer">
            {
              dashboardMenu.map((link) => {
                return <MenuItem {...link} key={link.id} />
              })
            }
          </div>
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
export default Sidebar;