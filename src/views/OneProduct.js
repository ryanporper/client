import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  deleteProductById,
  getProductById,
} from '../services/internalApiService';

export const OneProduct = (props) => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductById(id)
      .then((data) => {
        console.log(data);
        setProduct(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (product === null) {
    return null;
  }

  const handleDeleteClick = () => {
    deleteProductById(id)
      .then((deletedProduct) => {
        navigate('/products');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { title, price, description } =
    product;

  return (
    <div className="w-100 mx-auto shadow mb-4 rounded border p-4">
      <h4>{title}</h4>
      <p>Price: ${price}</p>
      <p>Description: {description}</p>
  
      <div className="mt-2">
        <button
          onClick={(e) => {
            handleDeleteClick();
          }}
          className="btn btn-sm btn-outline-danger mx-1"
        >
          Delete
        </button>
        
      </div>
    </div>
  );
};

export default OneProduct;