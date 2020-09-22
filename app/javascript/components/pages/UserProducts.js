import React, { useState, useEffect} from 'react'
import EllipsisText from "react-ellipsis-text";

export default function userProducts(props) {
  const [products, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState(props.currentUser)

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/products.json`);
      res
        .json()
        .then(products => {
          let filteredProducts = products.filter(product => product.user_id == currentUser.id)
          setProducts(filteredProducts);
        });
    }
    fetchData();
  }, []);

  return(
    <div className="products-container">
      <h1 className="text-center my-4">My Products</h1>
      <div className="card-columns mt-5">
        {products.map((product, index) => {
          return(
            <div  key={index}  className="card">
              <a href={`/products/${product.id}`} className="product-link">
                <img src={product.image_url} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <EllipsisText text={product.description} length={28} className="product-details"/> Read more <br/>
                </div>
                <div className="card-footer">
                  <small className="text-muted"><i className="fas fa-map-marker-alt"></i> {product.city}, {product.state}</small>
                </div>
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}
