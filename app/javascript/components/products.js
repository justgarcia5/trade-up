import React, { useState, useEffect} from 'react'

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
      <div className="row card-deck mt-5">
        {products.map((product, index) => {
          return(
            <div key={index} className="col-2 my-3">
              <div className="card">
                <a href="/" className="product-link">
                  <img src={product.image_url} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text-details">{product.details}</p>
                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                  </div>
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
