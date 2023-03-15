import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Title from "../../components/title/Title";
import { register, reset } from "../../features/auth/AuthSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    confirm_password: "",
  });
  const { user, success, error, loading, message } = useSelector(
    (state) => state.auth
  );

  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      return (
        <div className="alert alert-danger alert-dismissible">
          <button type="button" className="close" data-dismiss="alert">
            &times;
          </button>
          <strong>failed!</strong> {message}
        </div>
      );
    }

    // if (success || user) {
    //   navigate("/");
    // }
  }, [user, navigate, success, error, message]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!formData.first_name) {
      toast.error("First Name is required!");
    } else if (!formData.last_name) {
      toast.error("Last Name is required!");
    } else if (!formData.email) {
      toast.error("Email Address is required!");
    } else if (!formData.password) {
      toast.error("Password is required!");
    } else if (formData.password != formData.confirm_password) {
      toast.error("Passwords do not match!");
    } else {
      toast.success("Checkout Details submitted successfully!");
      navigate("/login");
    }
    dispatch(register(formData));
    console.log(formData);
  };

  //on change handler
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <Title title={"Register"} />
      <div className="row">
        <div className="offset-md-3 col-md-6 col-sm-12">
          <form onSubmit={submitHandler}>
            <h3>Sign Up</h3>
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

            <button type="submit" className="btn btn-primary form-control my-2">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
