import "./categories.style.scss";
import CategoryItem from "../categoryItem/CategoryItem";

const Categories = ({ categories }) => {
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <CategoryItem category={category} key={category.id} />
      ))}
    </div>
  );
};

export default Categories;
