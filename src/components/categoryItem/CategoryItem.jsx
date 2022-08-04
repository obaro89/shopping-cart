import "./category.style.scss";
import { useNavigate } from "react-router-dom";

const CategoryItem = ({ category }) => {
  const { id, imageUrl, title } = category;

  const navigate = useNavigate();
  return (
    <div
      className="body-category-container"
      key={id}
      onClick={() => navigate("/shop/" + title)}
    >
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="body">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default CategoryItem;
