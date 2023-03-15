import { Rating } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom'
import testImage from "../../../src/assets/tv2.jpg";

const Items = ({product}) => {
  return (
    <div className="col-md-4 mt-3">
      <div className="card shadow mb-2">
        <div className="card-body">
          <Link to={`/products/${product.id}`}>
            <img src={testImage} alt={product.name} />
          </Link>
          <div className="card-header">
            <p className="card-title">{product.name}</p>
            <p className="card-text fw-bold">
              KSh{" "}
              {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
            <Rating value={product.rating}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Items