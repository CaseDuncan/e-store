import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { newOrder, orderReset } from "../../features/order/PlaceOrderSlice";
import Title from "../title/Title";

const PlaceOrder = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { checkoutInformation } = useSelector((state) => state.checkout);
  const { error, success, message, items } = useSelector(
    (state) => state.orders
  );
  const { cartItems, totalQuantity } = useSelector(
    (state) => state.productCart
  );

  let amountPayable = 0;
  //get total amount
  cartItems.forEach((item) => {
    amountPayable += item.totalPrice;
  });

  // shipping price
  let shipping_price = amountPayable >= 100 ? 100 : 0;
  // tax price
  let tax_price = Number(0.05 * amountPayable).toFixed(0);
  //total price
  let total_price = (
    Number(shipping_price) +
    Number(tax_price) +
    Number(amountPayable)
  ).toFixed(0);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (!checkoutInformation) {
      navigate("/checkout");
    }
    if (error) {
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [navigate, message, error, checkoutInformation]);
  //place order
  const placeOrderHandler = (e) => {
    e.preventDefault();
    dispatch(
      newOrder({
        orderItems: cartItems,
        tax_price: tax_price,
        shipping_price: shipping_price,
        total_price: total_price,
        payment_method: checkoutInformation.payment,
        county: checkoutInformation.county,
        address: checkoutInformation.address,
        street: checkoutInformation.street,
      })
    );
    if (success && items?.length != 0) {
      navigate(`/orders/${order.id}`);
      toast.success("Order placed successfully!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    console.log("order placed");
  };

  return (
    <div className="container">
      <Title title={"Place Order"} />
      <h5 className="text-center display-6 my-3 fw-bold">Place Order</h5>
      <div className="row">
        <div className="col-md-3 offset-md-2">
          <h5 className="fw-bold">Shipping Information</h5>
          <div className="">
            <div className="card-body">
              <p>County: {checkoutInformation.county}</p>
              <p>Address: {checkoutInformation.address}</p>
              <p>Street: {checkoutInformation.street}</p>
              <p className="text-justify">
                Mode of Payment: {checkoutInformation.payment}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-3 offset-md-1">
          <h5 className="fw-bold">Order Summary</h5>
          <ul className="list-group">
            <li className="list-group-item">
              Quantity : <strong>{totalQuantity}</strong>{" "}
            </li>
            <li className="list-group-item">
              Shipping Price : <strong>Ksh. {shipping_price}</strong>
            </li>
            <li className="list-group-item">
              Total Price: <strong>kshs .{amountPayable}</strong>
            </li>
            <li className="list-group-item">
              Tax Price: <strong>Ksh. {tax_price}</strong>
            </li>
            <li className="list-group-item fw-bold">
              Amount Payable: {total_price}
            </li>
            <button
              type="submit"
              className="btn btn-primary my-2"
              onClick={placeOrderHandler}
            >
              Order Now
            </button>
          </ul>
        </div>
      </div>
      <hr />
      <h4 className="fw-bold">Order Items</h4>
      {cartItems.map((item) => (
        <div className="card rounded-3 mb-4" key={item.id}>
          <div className="card-body p-4">
            <div className="row d-flex justify-content-between align-items-center">
              <div className="col-md-2 col-lg-2 col-xl-2">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                  className="img-fluid rounded-3"
                  alt="Cotton T-shirt"
                />
              </div>
              <div className="col-md-3 col-lg-3 col-xl-3">
                <p className="lead fw-normal mb-2">{item.name}</p>
              </div>
              <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                <p className="my-2">
                  Quantity: <strong>{item.quantity}</strong>
                </p>
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h5 className="mb-0">
                  Ksh.
                  {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </h5>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlaceOrder;
