import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useSelector, useDispatch } from 'react-redux';
import { LOGIN_FAIL, LOGIN_SUCCESS } from '../store/types/auth.type';
import { userLogin } from '../store/actions/auth.action';

const Login = () => {
  console.log('Login');
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const [loginFormInput, setLoginFormInput] = useState({
    email: '',
    password: '',
  });

  const { authenticate, error, message } = useSelector((state) => state.auth);

  const handleLoginInput = (e) => {
    setLoginFormInput({
      ...loginFormInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitLogin = async (e) => {
    const { email, password } = loginFormInput;
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    dispatch(userLogin(formData));
  };

  // useEffect(() => {
  //   if (authenticate) {
  //     navigate('/');
  //   }

  //   if(message){
  //     alert.success(message)
  //     dispatch({type: LOGIN_SUCCESS})
  //   }

  //   if(error){
  //     error.map(err=> alert.error(err))
  //     dispatch({type: LOGIN_FAIL})
  //   }
  // }, [alert, authenticate, dispatch, error, message, navigate]);

  return (
    <div className="register">
      <div className="card">
        <div className="card-header">
          <h3>Login</h3>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmitLogin}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                onChange={handleLoginInput}
                value={loginFormInput.email}
                name="email"
                placeholder="Email"
                id="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                onChange={handleLoginInput}
                name="password"
                value={loginFormInput.password}
                placeholder="Password"
                id="password"
              />
            </div>
            <div className="form-group">
              <input type="submit" value="login" className="btn" />
            </div>
            <div className="form-group">
              <span>
                <Link to="/auth/register"> Dont have any account</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
