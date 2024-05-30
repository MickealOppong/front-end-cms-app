import CategoryTitle from "./CategoryTitle";
import SingleCategory from "./SingleCategory";

const CategoryContainer = ({ categories }) => {

  return <article className="h-[60vh]">
    <div className="mt-6">
      <CategoryTitle categories={categories} />
    </div>
    <div>

      {
        categories.content.map((category, index) => {
          return <div className={`p-4 border-t-2 last:border-b-2 w-[100vw]`} key={category.id}>
            <SingleCategory {...category} />
          </div>
        })
      }
    </div>
  </article>
}
export default CategoryContainer;