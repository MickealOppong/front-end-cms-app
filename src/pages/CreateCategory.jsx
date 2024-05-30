import { useSelector } from "react-redux";
import { Form, redirect } from "react-router-dom";
import { FormInputMandate } from "../components/index";
import { customFetch } from "../util";

export const action = (store, queryClient) => async ({ request }) => {
  const formData = await request.formData();
  const { name, description, icon } = Object.fromEntries(formData);
  const token = store.getState().userState.token;
  console.log(name, description, icon);
  try {
    const response = await customFetch.post('/api/products/categories', { name, description, icon }, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'multipart/form-data'
      }
    })
    queryClient.removeQueries(['categories'])
    return redirect('/categories')
  } catch (error) {
    console.log(error);
    return null;
  }

}
const CreateCategory = () => {
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)


  const width = () => {
    return `${showSidebar ? 'lg:max-w-3xl mx-auto  ' : 'lg:max-w-4xl mx-auto'}`
  }

  return <section className={`flex flex-col items-center mt-8 h-[70vh] ${showSidebar ? 'w-[80vw]' : 'w-[100vw]'} px-8 `
  }>
    <div className="text-black font-semibold uppercase mb-8 w-[60vw]">
      <h2>create categories</h2>
    </div>

    <Form method="post" className="flex flex-col bg-white p-16 gap-y-8 border-2 w-[60vw] " encType="multipart/form-data" >
      {/**CATEGORY NAME */}
      <FormInputMandate label='Category name' name='name' type='text' placeholder='Enter category name' size={'w-[50vw]'} />
      {/**CATEGORY DESCRIPTION */}
      <label htmlFor="description " className=" text-gray-600 font-semibold capitalize">Category Description</label>
      <textarea className={`textarea textarea-bordered  w-[50vw]`} placeholder="Description" id="description" name="description" />
      <div>
        <button className="btn btn-secondary w-36">save</button>
      </div>
    </Form>
  </section>
}
export default CreateCategory