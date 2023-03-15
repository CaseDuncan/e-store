import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify'
import Header from "../header/Header";
import mpesaImage from '../../assets/mpesa.png'

const Payment = () => {
  const[mpesaNumber, setmpesaNumber] = useState('')
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
