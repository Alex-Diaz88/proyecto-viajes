import "./styles.css";
import Product from "../Travel";

const ProductsList = ({ products, sellProduct }) => {
  return (
    <ul className="products_list">
      {products.map((product) => {
        return (
          <li key={product.id}>
            <Product product={product} sellProduct={sellProduct} />
          </li>
        );
      })}
    </ul>
  );
};

export default ProductsList;
