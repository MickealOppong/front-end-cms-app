const CategoryTitle = () => {

  return <article className="flex p-4 text-slate-600 w-[100vw]  rounded-xl uppercase text-xs ">
    {/**NAME */}
    <div className="flex w-60">
      <p >Category</p>
    </div>
    {/**DESCRIPTION */}
    <div className="flex w-80">
      <p >description</p>
    </div>
    {/**QUANTITY */}
    <div className="flex w-36">
      <p >quantity</p>
    </div>
    {/**SALE */}
    <div className="flex  w-36">
      <p >sale</p>
    </div>
    {/**CREATE AT */}
    <div className="flex w-28 ">
      <p className="">created at</p>
    </div>
    {/**ACTIONS */}
    <div className="flex ">
      <p className="ml-28" >actions</p>
    </div>
  </article >
}
export default CategoryTitle;