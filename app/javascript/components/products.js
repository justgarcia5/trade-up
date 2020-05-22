import React, { useState, useEffect} from 'react'
import LinesEllipsis from 'react-lines-ellipsis'

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
    <div className="card-columns products-container mt-4">
        {products.map((product, index) => {
          let height = index % 2 === 0 ? 'tall' : 'short'
          let firstEight = product.details.split(" ").filter((val, index) => index <= 4).join(" ")
          console.log(firstEight)
          return(
            <div key={index} className={`${height} mb-3`}>
              <div className={`card ${height}`}>
                <a href={`/products/${product.id}`} className="product-link">
                  <img src={product.image_url} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title text-center">{product.title}</h5>
                    <b className='card-text-details'>Description:</b>
                    <LinesEllipsis
                      className='card-text-details'
                      text={product.details}
                      maxLine='6'
                      ellipsis={`${firstEight}... `}
                      trimRight
                      basedOn='letters'
                    />
                    <p className="text-right mt-3">...Read more</p>
                  </div>
                  <div class="card-footer">
                    <small class="text-muted">Last updated 3 mins ago</small>
                  </div>
                </a>
              </div>
            </div>
          )
        })}
    </div>
  )
}
