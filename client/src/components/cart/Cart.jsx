import React, { useEffect } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
// import { useLocation } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./cart.css";
import testImage from '../../../src/assets/tv2.jpg'
import CartItem from "./CartItem";
import Title from "../title/Title";
import { cartActions } from "../../features/cart/productSlice";

const Cart = () => {
  // const { id } = useParams();
  // const location = useLocation();
  // const quantity = location.search ? Number(location.search.split("=")[1]) : 1;
  let navigate = useNavigate();

  const cartItems = useSelector((state) => state.productCart.cartItems);
  let amountPayable = 0;
  //get total amount
  cartItems.forEach((item) => {
    amountPayable += item.totalPrice;
  });

  const checkOut = () => {
    navigate("/shipping");
  };
  const dispatch = useDispatch();

  if (cartItems.length === 0) {
    return (
      <div className="alert alert-success">
        <strong>Whoops!!</strong> <span>Your Cart is Empty</span> {""}
        <Link to="/products" className="alert-link">
          Go to products
        </Link>
        <p></p>
      </div>
    );
  }
  return (
    <section className="h-100" style={{ backgroundColor: "#eee" }}>
      <Title title={"Shopping Cart"} />
      <div className="container h-100 py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-10">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
            </div>

            {cartItems.map((item) => (
              <div className="card rounded-3 mb-4" key={item.id}>
                <div className="card-body p-4">
                  <div className="row d-flex justify-content-between align-items-center">
                    <div className="col-md-2 col-lg-2 col-xl-2">
                      <img
                        src={testImage}
                        className="img-fluid rounded-3"
                        alt="Cotton T-shirt"
                      />
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-3">
                      <p className="lead fw-normal mb-2">{item.name}</p>
                      <p>
                        <span className="text-muted">Size: </span>M{" "}
                        <span className="text-muted">Color: </span>Grey
                      </p>
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                      <button
                        className="btn btn-link px-2"
                        onClick={() =>
                          dispatch(
                            cartActions.decrementQuantity({ id: item.id })
                          )
                        }
                      >
                        <RemoveCircleOutlinedIcon />
                      </button>

                      <p className="my-3 fw-bold">{item.quantity}</p>

                      <button
                        className="btn btn-link px-2"
                        onClick={() =>
                          dispatch(
                            cartActions.incrementQuantity({ id: item.id })
                          )
                        }
                      >
                        <AddCircleOutlinedIcon />
                      </button>
                    </div>
                    <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                      <h5 className="mb-0">
                        Ksh.
                        {item.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </h5>
                    </div>
                    <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                      <p
                        className="text-danger cursor-pointer"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch(cartActions.removeItem({ id: item.id }))
                        }
                      >
                        <DeleteOutlinedIcon />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <p className="fw-bold lead offset-md-5 mt-3">
                    Total: ksh.
                    {amountPayable
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                </div>
                <div className="col-md-6">
                  <button className="btn btn-success" onClick={()=>navigate('/checkout')}>Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
