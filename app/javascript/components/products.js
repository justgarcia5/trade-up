import React, { useState, useEffect} from 'react'
import EllipsisText from "react-ellipsis-text";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`/products.json`)
      .then(response => response.json())
      .then(products => {
        setProducts(products);
      });
  }, []);

  return(
    <div className="products-container">
      <div className="card-columns mt-5">
        {products.map((product, index) => {
          return(
            <div  key={index}  className="card">
              <a href={`/products/${product.id}`} className="product-link">
                <img src={product.image_url} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <EllipsisText text={product.details} length={28} className="product-details"/> Read more <br/>
                </div>
                <div className="card-footer">
                  <small className="text-muted"><i className="fas fa-map-marker-alt"></i> {product.location}</small>
                </div>
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}
