import React, { useState } from 'react';
import loginImg from '../../assets/images/1.svg';
import profile from '../../assets/images/profile.svg';
import './signup.css';
import { set, useForm } from 'react-hook-form';
import firebase from 'firebase';
// const moment = require('moment');

const axios = require('axios');
function Signup(props) {
  const [state, setState] = useState(false);

  const { loading } = state;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState();
  const [succ, setSucc] = useState();

  const loginHandler = (data) => {
    setState(true);

    const removeWhiteSpace = data.password.replace(/ /g, '');
    // console.log(removeWhiteSpace);
    if (removeWhiteSpace.length > 0) {
      firebase
        .firestore()
        .collection('userscollection')
        .doc(data.email)
        .get()
        .then((doc) => {
          setState(false);

          if (doc.exists) {
            setError('User already exist');
            // console.log('already exist');
          } else {
            firebase
              .auth()
              .createUserWithEmailAndPassword(data.email, data.password)
              .then((res) => {
                firebase
                  .firestore()
                  .collection('userscollection')
                  .doc(data.email)
                  .set(data)
                  .then((res) => {
                    setSucc('Your account has been created ');
                    props.history.push('/dashboard');
                    reset();
                  });
              })
              .catch((err) => {
                // console.log(err);
                setError(err.message);
              });
          }
        })
        .catch((err) => {
          //   console.log(err);
          setError(err.message);
        });
    } else {
      setError('Something Wrong');
    }
  };

  return (
    <div className="form-full-screen">
      <div className="form-container">
        <div className="form-img-container">
          <img src={loginImg} alt="My Awesome" />
        </div>
        <div className="form-inn-card">
          {error && <p className="text-danger error">{error}</p>}
          {succ && (
            <p style={{ color: 'green' }} className="text-danger">
              {succ}
            </p>
          )}
          {/* succ */}
          <form
            className="login-form common-form"
            onSubmit={handleSubmit(loginHandler)}
          >
            <div htmlFor="photo-upload">
              <h1 style={{ marginLeft: '9%' }}>Create New Profile</h1>
              <label htmlFor="photo-upload" className="custom-file-upload fas">
                <img htmlFor="photo-upload" src={profile} alt="My Awesome" />
                <input
                  disabled
                  style={{ visibility: 'hidden' }}
                  id="photo-upload"
                  type="file"
                />
              </label>
            </div>
            <div className="form-body">
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  {...register('name', {
                    required: 'Name is required',
                  })}
                  id="name"
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                />

                {errors.name && (
                  <p className="text-danger error">{errors.name.message}</p>
                )}
              </div>
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
              <div className="form-group">
                <label className="form-label">Phone number</label>
                <input
                  //   /^[0-9]{10}$/
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Phone number should be 10 (0-9)',
                    },
                  })}
                  id="phone"
                  type="number"
                  className="form-control"
                  placeholder="Enter your phone number"
                />

                {errors.phone && (
                  <p className="text-danger error">{errors.phone.message}</p>
                )}
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
                    Register now
                  </button>
                )}
              </div>
            </div>
            Have an account ?
            <a href="/" className="normal-link">
              Login
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Signup;
