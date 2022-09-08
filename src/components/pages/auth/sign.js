import React, { useState, useEffect } from 'react';
import loginImg from '../../assets/images/1.svg';
import './login.css';
import { useForm } from 'react-hook-form';
import firebase from 'firebase';

function Login(props) {
  const [state, setState] = useState(false);

  const { loading } = state;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (_usr) => {
      if (!_usr) {
        props.history.push(`/`);
      } else {
        props.history.push(`/dashboard`);

        // console.log("success",_usr.email)
        // setUser(_usr.email);
      }
    });
  }, []);

  const loginHandler = (data) => {
    setState(true);

    const removeWhiteSpace = data.password.replace(/ /g, '');

    if (removeWhiteSpace.length > 0) {
      firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then(
          () => {
            props.history.push(`/dashboard`);
          },
          (err) => {
            setState(false);
            //   alert(err.message)
            setError(err.message);

            console.log(err);
          }
        );
    } else {
      setError('Some think wrong');
    }
  };

  return (
    <div className="form-full-screen">
      <div className="form-container-signin">
        <div className="form-img-container-signin">
          <img src={loginImg} alt="My Awesome" />
        </div>
        <div className="form-inn-card-signin">
          <form
            className="login-form common-form"
            onSubmit={handleSubmit(loginHandler)}
          >
            <div className="form-head text-center">
              Welcome back
              <h3 className="form-title">Login to your account</h3>
            </div>
            <div className="form-body">
              {error ? (
                <div className="alert alert-danger error" role="alert">
                  {error ? error : ''}
                </div>
              ) : (
                ''
              )}
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Entered value does not match email format',
                    },
                  })}
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />

                {errors.email && (
                  <p className="text-danger error">{errors.email.message}</p>
                )}
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-wrap">
                  <input
                    {...register('password', {
                      required: 'password is required',
                    })}
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="Enter your Password"
                  />

                  {errors.password && (
                    <p className="text-danger error">Password is required.</p>
                  )}
                </div>
              </div>

              <div className="btn-wrap">
                {state ? (
                  <button type="submit" className="main-btn" disabled={state}>
                    {state && (
                      <i
                        className="fa fa-refresh fa-spin"
                        style={{ marginRight: '5px' }}
                      />
                    )}
                    {state && <span>Loading...</span>}
                  </button>
                ) : (
                  <button type="submit" className="main-btn">
                    Sign In
                  </button>
                )}
              </div>
            </div>
            Don't have an account ?
            <a href="register" className="normal-link">
              Register
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
