import { OrdersContainer, PaginationContainer } from "../components/index";

import { FaPlus, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { customFetch } from "../util";

export const loader = (store) => async ({ request }) => {
  const token = store.getState().userState.token;
  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);

  const response = await customFetch.get(`api/orders/orders?page=${params.page || 0}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  console.log(response);
  const orders = response.data.content;
  const page = response.data.number;
  const pageCount = response.data.totalPages;
  const size = response.data.size;
  const totalElements = response.data.totalElements;
  return { orders, page, pageCount, size, totalElements }
}

const OrderList = () => {
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)

  return <section className={`mt-8 w-full ${showSidebar ? 'max-w-6xl' : 'max-w-9xl'} mx-auto
  px-16 h-[150vh] `
  }>
    <div className="flex flex-col gap-y-4 bg-white h-[60vh] p-4">

      <div className="flex justify-between">
        {/**SEARCH */}
        <form className="flex items-center border-[1px] rounded-md border-gray-300 px-4">
          <input type="search" name='username' placeholder="Search products" className=" w-[20vw] outline-none indent-2" />
          <button><FaSearch /></button>
        </form>

        {/**ADD NEW */}
        <Link className="flex items-center btn btn-ghost border-cyan-700  w-36 hover:bg-primary hover:text-gray-200 " to='/order'>
          <FaPlus />
          <span>Add new</span>
        </Link>
      </div>

      <div >
        <OrdersContainer />
      </div>
      <div>
        <PaginationContainer />
      </div>
    </div>

  </section>
}

export default OrderList