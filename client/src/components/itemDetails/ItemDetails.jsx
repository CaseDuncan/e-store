import React, { useState, useEffect } from "react";
import "./cart-disabled.css";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getProductDetails } from "../../features/itemDetails/ItemDetailSlice";
import { addItemToCart } from "../../features/cart/cartSlice";
import testImage from "../../../src/assets/tv2.jpg";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../features/cart/productSlice";
import Title from "../title/Title";
import { Rating } from "@mui/material";

const ItemDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [review, setReview] = useState({
    review: "",
  });

  const navigate = useNavigate();

  const { id } = useParams();

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.itemDetails);
  const { loading, error, item } = productDetails;

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch]);

  // add to cart functionality
  const addToCartHandler = () => {
    dispatch(
      cartActions.addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        instock:item.instock
      })
    );
    // dispatch(addItemToCart({
    //   id,
    //   name,
    // }))
    // navigate(`/cart/${id}?quantity=${quantity}`);
    navigate('/cart')
  };
  // add to product review functionality
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h4>product image</h4>
            <img src={testImage} alt="soundbar" className="image-responsive" />
          </div>
          <div className="col-md-6">
            <h4>product info</h4>
            <div className="row">
              <div className="col-md-12">
                <h4>{item.name}</h4>
                <span className="label label-primary">Vintage</span>
                <span class="monospaced">No. 1960140180</span>
              </div>
            </div>

            <div class="row">
              <div class="col-md-3">
                <span class="sr-only">Four out of Five Stars</span>
                <span
                  className="glyphicon glyphicon-star"
                  aria-hidden="true"
                ></span>
                <span
                  className="glyphicon glyphicon-star"
                  aria-hidden="true"
                ></span>
                <span
                  class="glyphicon glyphicon-star"
                  aria-hidden="true"
                ></span>
                <span
                  class="glyphicon glyphicon-star"
                  aria-hidden="true"
                ></span>
                <span
                  class="glyphicon glyphicon-star-empty"
                  aria-hidden="true"
                ></span>
                <span class="label label-success">61</span>
              </div>
              <div class="col-md-3">
                <span class="monospaced">Write a Review</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <Title title={"Product Details"} />
        <Link to={"/products"} className="btn btn-outline-dark my-2">
          Back
        </Link>

        <div className="row">
          <div className="col-md-6">
            <img src={item.image} alt={item.name} />
            <h3 className="">{item.name}</h3>
            <p className="lead">{item.description}</p>
          </div>
          <div
            className="col-md-3 card"
            style={{ width: "280px", height: "340px" }}
          >
            <p className="card-text fw-bold">
              Product Status:{item.instock > 0 ? "In stock" : "Out Stock"}
            </p>
            <p className="card-text fw-bold">KSh {item.price}</p>
            <Rating value={item.rating}/>
            <p className="fw-bold">{item.numReviews} reviews</p>
            {/* {item.instock > 0 && (
            <div className="list-group-item">
              <div className="row">
                <div className="col">Quantity</div>
                <div className="col-xs-auto my-1">
                  <form>
                    <select
                      name="quantity"
                      id="quantity"
                      className="form-select"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    >
                      {[...Array(item.instock).keys()].map((count) => (
                        <option value={count + 1} key={count + 1}>
                          {count + 1}
                        </option>
                      ))}
                    </select>
                  </form>
                </div>
              </div>
            </div>
          )} */}
            <div className="row">
              <div className="col-md-5">
                <button
                  onClick={addToCartHandler}
                  className={
                    item.instock === 0
                      ? "cart-disabled btn btn-secondary "
                      : "btn btn-success mb-3 mt-3"
                  }
                  disabled={item.instock === 0}
                >
                  <AddShoppingCartOutlinedIcon />
                </button>
              </div>

              <div className="col-md-5">
                <button className="btn btn-danger mb-3 mt-3">
                  delete Cart
                </button>
              </div>
            </div>

            <button
              className="btn btn-sm btn-outline-primary mb-3"
              data-bs-toggle="modal"
              data-bs-target="#review-modal"
            >
              review product
            </button>
          </div>
        </div>
        <div className="modal fade mt-5" id="review-modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Add Review</h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="review">Review</label>
                    <textarea
                      name="review"
                      id="review"
                      cols="10"
                      rows="5"
                      className="form-control"
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                    >
                      Your review goes here.....
                    </textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="rating">Rating</label>
                    <select
                      name="rating"
                      id="rating"
                      className="form-select mt-3"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="form-control mt-3 btn btn-success"
                    data-bs-dismiss="modal"
                  >
                    Review
                  </button>
                </form>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetails;
