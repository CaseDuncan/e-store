import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import { toast } from 'react-toastify'
import Header from "../header/Header";
import mpesaImage from '../../assets/mpesa.png'

const Payment = () => {
  const[mpesaNumber, setmpesaNumber] = useState('')
  const { checkoutInformation } = useSelector((state) => state.checkout);
  const { error, success, message } = useSelector((state) => state.orders);
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
  let tax_price = Number(0.05 * amountPayable).toFixed(2);
  //total price
  let total_price = (
    Number(shipping_price) +
    Number(tax_price) +
    Number(amountPayable)
  ).toFixed(2);
  const [sdkReady, setSdkReady] = useState(false);

  // clinetId :ARmTvB2UaHQJk9haVudeypKFMfc6orlHouyrddydXh4QFMqq75Z8YP-9N9X2VzOAvaMejtYuDi_t-M8H
  const createPayPalButton = () => {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=ARmTvB2UaHQJk9haVudeypKFMfc6orlHouyrddydXh4QFMqq75Z8YP-9N9X2VzOAvaMejtYuDi_t-M8H";
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!window.paypal) {
      createPayPalButton();
    }
  });

  // trigger mpesa API call
  const MpesaAPICall = (e) => {
    e.preventDefault()
    if (!mpesaNumber) {
      toast.error('Please provide a valid Safaricom Number')
    } else {
            toast.success(`Safaricom Number ${mpesaNumber} submitted successfully`);
    }
    console.log(mpesaNumber);
    setmpesaNumber('')
  }

  return (
    <Header>
      <div className="container">
        <h4>Make Payment</h4>
        <div className="row">
          <div className="col-md-3 offset-md-1">
            <h5>Order Summary</h5>
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
            </ul>
          </div>
          {/* payment paypal */}
          <div className="col-md-3 offset-md-2 mt-5">
            <PayPalButton amount={total_price} />
          </div>
          {/* payment mpesa */}
          <div className="col-md-3 mt-3">
            <form action="">
              <div className="form-group">
                <img src={mpesaImage} alt="mpesa" style={{ width: "100px" }} />
                <label htmlFor="mpesa-number"> Number</label>
                <input
                  type="text"
                  name="mpesaNumber"
                  value={mpesaNumber}
                  onChange={(e) => setmpesaNumber(e.target.value)}
                  className="form-control"
                  placeholder="254729079809"
                />
              </div>
              <button
                type="submit"
                className="btn btn-success form-control"
                style={{ marginBottom: "15px" }}
                onClick={MpesaAPICall}
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        <hr />
      </div>
    </Header>
  );
};

export default Payment;
