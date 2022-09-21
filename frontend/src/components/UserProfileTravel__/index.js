import ProductsList from "../ProductsList";

const UserProfileProducts = ({ userProducts, sellProduct }) => {
  return (
    <section>
      <h3>User products</h3>

      {userProducts.length > 0 && (
        <ProductsList products={userProducts} sellProduct={sellProduct} />
      )}

      {userProducts.length === 0 && (
        <p>Este usuario aún no ha subido productos</p>
      )}
    </section>
  );
};

export default UserProfileProducts;
