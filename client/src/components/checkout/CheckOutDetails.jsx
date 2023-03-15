import React, { useState, useEffect } from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Title from "../title/Title";
import { checkoutInfo, checkoutReset } from "../../features/checkoutinfo/CheckoutSlice";
import "./checkout.css";

const CheckOutDetails = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.productCart.cartItems);
  const { totalQuantity } = useSelector((state) => state.productCart);
  const { user, message } = useSelector((state) => state.auth);
  const { checkoutInformation } = useSelector((state) => state.checkout);
  let amountPayable = 0;
  //get total amount
  cartItems.forEach((item) => {
    amountPayable += item.totalPrice;
  });

  const [formData, setFormData] = useState({
    payment: "",
    first_name: user?.first_name,
    last_name: user?.last_name,
    email: '',
    county: "",
    address: "",
    street: "",
  });
  const paymentMode = [
    {
      id: 1,
      mode: "M-pesa",
    },
    {
      id: 2,
      mode: "Paypal",
    },
  ];

  useEffect(() => {
    if(!user){
      navigate('/login')
    }
    if (checkoutInformation) {
           navigate("/placeorder");
   }
  })

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!formData.county) {
      toast.error("County is required!");
    } else if (!formData.address) {
      toast.error("Address is required!");
      } else if (!formData.street) {
      toast.error("Street Address is required!");
      } else if (!formData.payment) {
      toast.error("Payment method  is required!");
    } else {
      toast.success("Checkout Details submitted successfully!");
      navigate('/placeorder')
    }
    dispatch(checkoutInfo(formData))
    
    console.log(formData);
  };

  return (
    <>
      <Title title={"Checkout Details"} />
      <h4 className="fw-bold">Checkout Details</h4>
      <div className="checkout-row">
        <div className="checkout-col-75">
          <div className="content">
            <form onSubmit={submitHandler}>
              <div className="checkout-row">
                <div className="checkout-col-50">
                  <h3>Billing & Shipping Address</h3>
                  <label htmlFor="first_name">
                    <i className="fa fa-user"></i> First Name
                  </label>
                  <input
                    type="text"
                    id="fname"
                    name="first_name"
                    placeholder="Case"
                    value={formData.first_name}
                    onChange={(e) => onChangeHandler(e)}
                  />
                  <label htmlFor="fname">
                    <i className="fa fa-user"></i> Last Name
                  </label>
                  <input
                    type="text"
                    id="fname"
                    name="last_name"
                    placeholder="Duncan"
                    value={formData.last_name}
                    onChange={(e) => onChangeHandler(e)}
                  />
                  <label htmlFor="email">
                    <i className="fa fa-envelope"></i> Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="duncan@gmail.com"
                    value={user ? user.email : ""}
                    onChange={(e) => onChangeHandler(e)}
                    autoComplete="off"
                  />
                  <label htmlFor="address">
                    <i className="fa fa-address-card-o"></i> Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Utawala"
                    value={formData.address}
                    onChange={(e) => onChangeHandler(e)}
                    autoComplete="off"
                  />

                  <div className="checkout-row">
                    <div className="checkout-col-50">
                      <label htmlFor="state">County</label>
                      <input
                        type="text"
                        name="county"
                        placeholder="Nairobi"
                        value={formData.county}
                        onChange={(e) => onChangeHandler(e)}
                        autoComplete="off"
                      />
                    </div>
                    <div className="checkout-col-50">
                      <LocationOnOutlinedIcon />
                      <label htmlFor="street">Street</label>
                      <input
                        type="text"
                        id="street"
                        name="street"
                        placeholder="Airways"
                        value={formData.street}
                        onChange={(e) => onChangeHandler(e)}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>

                <div className="checkout-col-50">
                  <h3>Payment Method</h3>
                  <label htmlFor="fname">Accepted Methods</label>
                  <div className="icon-container">
                    <i className="fa fa-cc-visa" style={{ color: "navy" }}>
                      M-pesa
                    </i>{" "}
                    <span>/</span>
                    <i className="fa fa-cc-amex" style={{ color: "blue" }}>
                      Paypal
                    </i>
                    <i
                      className="fa fa-cc-mastercard"
                      style={{ color: "red" }}
                    ></i>
                    <i
                      className="fa fa-cc-discover"
                      style={{ color: "orange" }}
                    ></i>
                  </div>

                  <label htmlFor="payment">Select Mode of Payment</label>
                  <select
                    style={{ backgroundColor: "#ffff", cursor: "pointer" }}
                    value={formData.payment}
                    onChange={(e) => onChangeHandler(e)}
                    name="payment"
                  >
                    {paymentMode.map((item) => {
                      return (
                        <option
                          value={item.mode}
                          key={item.id}
                          onChange={(e) => onChangeHandler(e)}
                        >
                          {item.mode}
                        </option>
                      );
                    })}
                  </select>

                  <label htmlFor="cname">Name on Card</label>
                  <input
                    type="text"
                    id="cname"
                    name="cardname"
                    placeholder="John More Doe"
                  />
                  <label htmlFor="ccnum">Credit card number</label>
                  <input
                    type="text"
                    id="ccnum"
                    name="cardnumber"
                    placeholder="1111-2222-3333-4444"
                  />
                </div>
              </div>
              <input
                type="submit"
                value="Proceed to Checkout"
                className="checkout-btn btn btn-success"
              />
            </form>
          </div>
        </div>

        <div className="checkout-col-25">
          <div className="content">
            <h4>
              Cart Summary
              <span className="price" style={{ color: "black" }}>
                <i className="fa fa-shopping-cart"></i>
                <sup>
                  <b>{totalQuantity}</b>
                </sup>
              </span>
            </h4>
            {cartItems ? (
              cartItems.map((item) => (
                <p key={item.id}>
                  <Link to={`products/${item.id}`}>{item.name}</Link>{" "}
                  <span className="price">ksh {item.price}</span>
                </p>
              ))
            ) : (
              <div className="alert alert-success">
                <strong>Whoops!!</strong> <span>Your Cart is Empty</span> {""}
                <Link to="/products" className="alert-link">
                  back to products
                </Link>
                <p></p>
              </div>
            )}
            <hr />
            <p>
              Total{" "}
              <span className="price" style={{ color: "black" }}>
                <b>
                  ksh.{" "}
                  {amountPayable
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </b>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOutDetails;
