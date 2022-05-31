import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userRegister } from "../store/actions/auth.action";

const Register = () => {
  const dispatch = useDispatch();
  const [registerInputData, setRegisterInputData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const [loadImage, setLoadImage] = useState("");

  const inputHandle = (e) => {
    setRegisterInputData({
      ...registerInputData,
      [e.target.name]: e.target.value,
    });
  };

  const fileHandle = (e) => {
    if (e.target.files.length !== 0) {
      setRegisterInputData({
        ...registerInputData,
        [e.target.name]: e.target.files[0],
      });
    }

    const reader = new FileReader();
    reader.onload = () => {
      setLoadImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const register = (e) => {
    const { username, email, password, confirmPassword, image } =
      registerInputData;
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("image", image);

    dispatch(userRegister(formData));
  };

  return (
    <div className="register">
      <div className="card">
        <div className="card-header">
          <h3>Register</h3>
        </div>

        <div className="card-body">
          <form onSubmit={register}>
            <div className="form-group">
              <label htmlFor="username">User Name</label>
              <input
                type="text"
                className="form-control"
                onChange={inputHandle}
                name="username"
                value={registerInputData.username}
                placeholder="User Name"
                id="username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                onChange={inputHandle}
                name="email"
                value={registerInputData.email}
                placeholder="Email"
                id="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                onChange={inputHandle}
                name="password"
                value={registerInputData.password}
                placeholder="Password"
                id="password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                onChange={inputHandle}
                name="confirmPassword"
                value={registerInputData.confirmPassword}
                placeholder="Confirm Password"
                id="confirmPassword"
              />
            </div>
            <div className="form-group">
              <div className="file-image">
                <div className="image">
                  {loadImage ? <img src={loadImage} alt="" /> : ""}
                </div>
                <div className="file">
                  <label htmlFor="image">Select Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={fileHandle}
                    id="image"
                    name="image"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <input type="submit" value="register" className="btn" />
            </div>
            <div className="form-group">
              <span>
                <Link to="/messenger/login"> Login your account</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
