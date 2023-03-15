import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { profileUpdate, reset } from "../../features/auth/AuthSlice";

const Profile = () => {
  const { user, success, error, loading, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    username: user.username,
    password: "",
    confirm_password: "",
  });
  
  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset())
  },[dispatch, success, message])
  
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(profileUpdate(formData));
    console.log(formData);
  };

  //on change handler
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      {/* TEST */}
      <section style={{backgroundColor: "#eee"}}>
        <div class="container py-5">
          <div class="row">
            <div class="col">
              <nav aria-label="breadcrumb" class="bg-light rounded-3 p-3 mb-4">
                <ol class="breadcrumb mb-0">
                  <li class="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="#">User</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    User Profile
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-4">
    
              
            </div>
            <div class="col-lg-6">
              <div class="card mb-4">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Full Name</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">Johnatan Smith</p>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Email</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">example@example.com</p>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Phone</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">(097) 234-5678</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Mobile</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">(098) 765-4321</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Address</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">Bay Area, San Francisco, CA</p>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>
      {/* TEST */}
      <div className="row">
        <h3 className="text-capitalize">{user.username + "'s"} Profile</h3>
        <div className="col-md-5">
          <form onSubmit={submitHandler}>
            <h5>Update Profile</h5>
            <div className="row">
              <div className="col-sm-12">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="case"
                  value={formData.username}
                  onChange={(e) => onChangeHandler(e)}
                />
              </div>

              <div className="col-sm-12">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={(e) => onChangeHandler(e)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <label htmlFor="first_name">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  placeholder="case"
                  className="form-control"
                  value={formData.first_name}
                  onChange={(e) => onChangeHandler(e)}
                />
              </div>

              <div className="col-sm-12">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  placeholder="duncan"
                  className="form-control"
                  value={formData.last_name}
                  onChange={(e) => onChangeHandler(e)}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  autoComplete="off"
                  placeholder="qWh5$64W#"
                  value={formData.password}
                  onChange={(e) => onChangeHandler(e)}
                />
              </div>

              <div className="col-sm-12">
                <label htmlFor="confirm_password">Confirm Password</label>
                <input
                  type="password"
                  name="confirm_password"
                  className="form-control"
                  placeholder="re-enter password"
                  autoComplete="off"
                  value={formData.confirm_password}
                  onChange={(e) => onChangeHandler(e)}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-dark form-control my-2">
              Update
            </button>
          </form>
        </div>

        <div className="col-md-7">
          <h5>Order History</h5>
          <table className="table-dark table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Amount Paid</th>
                <th>Tax</th>
                <th>Shipment Status</th>
                <th>Date</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      {/* testing */}
      <section class="h-100 gradient-custom">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-lg-12 col-xl-8">
              <div class="card" style={{borderRadius: "10px"}}>
                <div class="card-header px-4 py-5">
                  <h5 class="text-muted mb-0">
                    Thanks for your Order,{" "}
                    <span style={{color: "#a8729a"}}>Anna</span>!
                  </h5>
                </div>
                <div class="card-body p-4">
                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <p class="lead fw-normal mb-0" style={{color: "#a8729a"}}>
                      Receipt
                    </p>
                    <p class="small text-muted mb-0">
                      Receipt Voucher : 1KAU9-84UIL
                    </p>
                  </div>
                  <div class="card shadow-0 border mb-4">
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-2">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/13.webp"
                            class="img-fluid"
                            alt="Phone"
                          />
                        </div>
                        <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                          <p class="text-muted mb-0">Samsung Galaxy</p>
                        </div>
                        <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                          <p class="text-muted mb-0 small">White</p>
                        </div>
                        <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                          <p class="text-muted mb-0 small">Capacity: 64GB</p>
                        </div>
                        <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                          <p class="text-muted mb-0 small">Qty: 1</p>
                        </div>
                        <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                          <p class="text-muted mb-0 small">$499</p>
                        </div>
                      </div>
                      <hr
                        class="mb-4"
                        style={{backgroundColor: "#e0e0e0", opacity: 1}}
                      />
                      <div class="row d-flex align-items-center">
                        <div class="col-md-2">
                          <p class="text-muted mb-0 small">Track Order</p>
                        </div>
                        <div class="col-md-10">
                          <div
                            class="progress"
                            style={{height: "6px", borderRadius: "16px"}}
                          >
                            <div
                              class="progress-bar"
                              role="progressbar"
                              style={{width: "65%", borderRadius: "16px", backgroundColor: "#a8729a"}}
                              aria-valuenow="65"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                          <div class="d-flex justify-content-around mb-1">
                            <p class="text-muted mt-1 mb-0 small ms-xl-5">
                              Out for delivary
                            </p>
                            <p class="text-muted mt-1 mb-0 small ms-xl-5">
                              Delivered
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card shadow-0 border mb-4">
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-2">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/1.webp"
                            class="img-fluid"
                            alt="Phone"
                          />
                        </div>
                        <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                          <p class="text-muted mb-0">iPad</p>
                        </div>
                        <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                          <p class="text-muted mb-0 small">Pink rose</p>
                        </div>
                        <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                          <p class="text-muted mb-0 small">Capacity: 32GB</p>
                        </div>
                        <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                          <p class="text-muted mb-0 small">Qty: 1</p>
                        </div>
                        <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                          <p class="text-muted mb-0 small">$399</p>
                        </div>
                      </div>
                      <hr
                        class="mb-4"
                        style={{backgroundColor: "#e0e0e0", opacity: 1}}
                      />
                      <div class="row d-flex align-items-center">
                        <div class="col-md-2">
                          <p class="text-muted mb-0 small">Track Order</p>
                        </div>
                        <div class="col-md-10">
                          <div
                            class="progress"
                            style={{height: "6px", borderRadius: "16px"}}
                          >
                            <div
                              class="progress-bar"
                              role="progressbar"
                              style={{width: "20%", borderRadius: "16px", backgroundColor: "#a8729a"}}
                              aria-valuenow="20"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                          <div class="d-flex justify-content-around mb-1">
                            <p class="text-muted mt-1 mb-0 small ms-xl-5">
                              Out for delivary
                            </p>
                            <p class="text-muted mt-1 mb-0 small ms-xl-5">
                              Delivered
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="d-flex justify-content-between pt-2">
                    <p class="fw-bold mb-0">Order Details</p>
                    <p class="text-muted mb-0">
                      <span class="fw-bold me-4">Total</span> $898.00
                    </p>
                  </div>

                  <div class="d-flex justify-content-between pt-2">
                    <p class="text-muted mb-0">Invoice Number : 788152</p>
                    <p class="text-muted mb-0">
                      <span class="fw-bold me-4">Discount</span> $19.00
                    </p>
                  </div>

                  <div class="d-flex justify-content-between">
                    <p class="text-muted mb-0">Invoice Date : 22 Dec,2019</p>
                    <p class="text-muted mb-0">
                      <span class="fw-bold me-4">GST 18%</span> 123
                    </p>
                  </div>

                  <div class="d-flex justify-content-between mb-5">
                    <p class="text-muted mb-0">Recepits Voucher : 18KU-62IIK</p>
                    <p class="text-muted mb-0">
                      <span class="fw-bold me-4">Delivery Charges</span> Free
                    </p>
                  </div>
                </div>
                <div
                  class="card-footer border-0 px-4 py-5"
                  style={{backgroundColor: "#a8729a", borderBottomLeftRadius: "10px",borderBottomRightRadius: "10px"}}
                >
                  <h5 class="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">
                    Total paid: <span class="h2 mb-0 ms-2">$1040</span>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* testing */}
    </div>
  );
};

export default Profile;
