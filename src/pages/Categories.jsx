import { FaPlus, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLoaderData } from "react-router-dom";
import { CategoryContainer, PaginationContainer } from "../components";
import { customFetch } from "../util";
const categoriesQuery = (page, token) => {
  return {
    queryKey: ['categories', page ? parseInt(page) : 0],
    queryFn: async () => customFetch.get(`/api/products/categories?page=${page ?? 0}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

}
export const loader = (store, queryClient) => async ({ request }) => {

  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);
  const token = store.getState().userState.token;
  const query = categoriesQuery(params.page, token)

  const response = await queryClient.fetchQuery(query)

  const categories = response.data;
  const page = response.data.number;
  const pageCount = response.data.totalPages;
  const size = response.data.size;
  const totalElements = response.data.totalElements;
  return { categories, page, pageCount, size, totalElements }

}
const Categories = () => {
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)
  const { categories } = useLoaderData();

  const width = () => {
    return ` ${showSidebar ? 'lg:w-[70vw]' : 'lg:w-[90vw] '}`
  }


  return <section className={`mt-8 w-full ${showSidebar ? 'max-w-6xl' : 'max-w-9xl'} duration-300 mx-auto
  px-16 h-[150vh] `
  }>
    <div className={`text-black tracking-wider font-semibold uppercase mb-8 mx-auto max-w-6xl `}>
      <h2>All Categories</h2>
    </div>
    <div className={`flex flex-col gap-y-4 bg-white h-[65vh] p-4 border-2 max-w-6xl mx-auto `}>
      <div className="flex justify-between">
        {/**SEARCH */}
        <form className="flex items-center border-[1px] rounded-md border-gray-300 px-4">
          <input type="search" name='username' placeholder="Search category" className=" w-[20vw] outline-none indent-2" />
          <button><FaSearch /></button>
        </form>

        {/**ADD NEW */}
        <Link className="flex items-center btn btn-ghost border-cyan-700  w-36 hover:bg-primary hover:text-gray-200 " to='/category'>
          <FaPlus />
          <span>Add new</span>
        </Link>
      </div>
      <div>
        <div className="flex overflow-scroll no-scrollbar flex-col gap-y-8 rounded-xl">
          <CategoryContainer categories={categories} />
        </div>
      </div>
    </div>
    <div className={`flex justify-end  max-w-6xl mx-auto ${showSidebar ? "mr-10" : ""} `}>
      <PaginationContainer />
    </div>




  </section>
}
export default Categories;