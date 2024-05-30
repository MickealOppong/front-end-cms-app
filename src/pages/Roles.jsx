import { FaPlus, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, redirect } from "react-router-dom";
import { PaginationContainer, RolesContainer } from '../components/index';
import { customFetch } from "../util";

const rolesQuery = (page, token) => {

  return {
    queryKey: ['roles', parseInt(page) ?? 0],
    queryFn: () => customFetch.get(`/api/roles/all?page=${page ?? 0}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}
export const loader = (store, queryClient) => async ({ request }) => {
  try {
    const token = store.getState().userState.token;
    const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);
    const response = await queryClient.fetchQuery(rolesQuery(params.page, token))

    const roles = response.data.content;
    const page = response.data.number;
    const pageCount = response.data.totalPages;
    const size = response.data.size;
    const totalElements = response.data.totalElements;

    return { roles, page, pageCount, size, totalElements }
  } catch (error) {
    if (error?.response?.status === 401) {
      return redirect('')
    }
    return null;
  }
}
const Roles = () => {
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)
  return <section className={`mt-8 h-[120vh] ${showSidebar ? 'w-[80vw]' : 'w-[100vw]'} px-8`
  }>
    <div className={`text-black font-semibold uppercase mb-8 max-w-6xl mx-auto tracking-wider  ${showSidebar ? 'mr-8' : ''}`}>
      <h2>Role List</h2>
    </div>
    <div className={`flex flex-col gap-y-4 bg-white h-[60vh] p-4 border-2 max-w-6xl mx-auto ${showSidebar ? 'mr-8' : ''}`}>
      <div className="flex justify-between">
        {/**SEARCH */}
        <form className="flex items-center border-[1px] rounded-md border-gray-300 px-4">
          <input type="search" name='username' placeholder="Search role" className=" w-[20vw] outline-none indent-2" />
          <button><FaSearch /></button>
        </form>

        {/**ADD NEW */}
        <Link className="flex items-center btn btn-ghost border-cyan-700  w-36 hover:bg-primary hover:text-gray-200 " to='/createRole'>
          <FaPlus />
          <span>Add new</span>
        </Link>
      </div>
      <div>
        <article >
          <RolesContainer />
        </article>
      </div>
    </div>
    <div className="flex justify-end max-w-6xl mx-auto">
      <PaginationContainer />
    </div>
  </section>
}
export default Roles;