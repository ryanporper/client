import { useEffect, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';

import {
  deleteProductById,
  getAllProducts,
  createProduct
} from '../services/internalApiService';

export const AllProducts = (props) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    getAllProducts()
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDeleteClick = (idToDelete) => {
    deleteProductById(idToDelete)
      .then((deletedProduct) => {
        const filteredProducts = products.filter((product) => {
          return product._id !== idToDelete;
        });

        console.log('deletedProduct:', deletedProduct);
        setProducts(filteredProducts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNewProductSubmit = (event) => {
    event.preventDefault();

    const newProduct = {
      title,
      price,
      description
    };

    createProduct(newProduct)
      .then((data) => {
        console.log('new product data:', data);
        navigate('/products');
      })
      .catch((error) => {
        console.log(error);
        // `?.` allows you to safely access keys that may not exist 
        setErrors(error?.response?.data?.errors);
      });
  };

  return (
    <div className="w-50 p-4 rounded mx-auto shadow">
      <form onSubmit={(e) => handleNewProductSubmit(e)}>
        <div className="form-group">
          <label className="h6">Title</label>
          {errors?.title && (
            <span style={{ color: 'red' }}> {errors?.title?.message}</span>
          )}
          <input
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            type="text"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="h6">Price</label>
          {errors?.price && (
            <span style={{ color: 'red' }}>
              {' '}
              {errors?.price?.message}
            </span>
          )}
          <input
            onChange={(event) => {
              setPrice(event.target.value);
            }}
            type="number"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="h6">Description</label>
          {errors?.description && (
            <span style={{ color: 'red' }}>
              {' '}
              {errors?.description?.message}
            </span>
          )}
          <input
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            type="text"
            className="form-control"
          />
        </div>

        <button className="btn btn-sm btn-outline-success">Submit</button>
      </form>
    
      <div className="w-50 mx-auto text-center">
        <h2>All Products:</h2>

        {products.map((product) => {
          const { _id, title } =
            product;

          return (
            <div key={_id} className="shadow mb-4 rounded border p-4">
              <Link to={`/products/${_id}`}>
                <h4>{title}</h4>
              </Link>
              <div className="mt-2">
                <button
                  onClick={(e) => {
                    handleDeleteClick(_id);
                  }}
                  className="btn btn-sm btn-outline-danger mx-1"
                >
                  Delete
                </button>

                <Link
                  to={`/products/${_id}/edit`}
                  className="btn btn-sm btn-outline-warning mx-1"
                >
                  Edit
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllProducts;