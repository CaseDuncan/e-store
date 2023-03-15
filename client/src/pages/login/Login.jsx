import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Title from "../../components/title/Title";
import './password-toggle.css'
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { login, reset } from "../../features/auth/AuthSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const[capsLock, setCapsLock] = useState(false)
  const [visibility, setVisibility] = useState(false);

  const toggle = () => {
    setVisibility(visibility=>!visibility)
  }
  const { user, success, error, loading, message } = useSelector(
    (state) => state.auth
  );

  let location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      navigate("/products");
    } else {
      navigate("/login");
    }

    if (error) {
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER
      });
    }
    if (user && success) {
      toast.success('Login Successfull', {
        position: toast.POSITION.TOP_CENTER
      })
    }
    dispatch(reset());
  }, [dispatch, user,redirect, navigate, error, message]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!formData.username) {
      toast.error("username is required!", {
        position:toast.POSITION.TOP_CENTER
      });
    } else if (!formData.password) {
      toast.error("Password is required!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } 
    dispatch(login(formData));
  };

  //on change handler
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const detectCapsLock = (e) => {
    e.getModifierState("CapsLock")
    setCapsLock(capsLock)
  }
  
  return (
    <>
      <div className="container mt-5">
        <Title title={"Sign In"} />
        <div className="row">
          <div className="col-md-6 offset-md-3 card shadow">
            <h4>Sign In</h4>
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  value={formData.username}
                  autoComplete="off"
                  onChange={(e) => onChangeHandler(e)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">Password</label>
                <span className="input-icon">
                  <LockOutlinedIcon />
                </span>
                <input
                  type={visibility ? "text" : "password"}
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onKeyUp={detectCapsLock}
                  onChange={(e) => onChangeHandler(e)}
                  autoComplete="off"
                />
                {
                  capsLock? <p id="text" style={{color:'red'}}>WARNING! Caps lock is ON.</p>:''
                }
               
                <span className="password-toggler" onClick={toggle}>
                  {visibility ? (
                    <VisibilityOutlinedIcon />
                  ) : (
                    <VisibilityOffOutlinedIcon />
                  )}
                </span>
              </div>
              <button
                type="submit"
                className="btn btn-primary form-control my-2"
              >
                Sign In
              </button>
            </form>
            <p>
              Don't have an account?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
