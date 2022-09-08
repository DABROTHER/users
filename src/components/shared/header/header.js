import React, { useState, useEffect } from 'react';
import './header.css';
import logo from '../../assets/images/dash.svg';
import avtar from '../../assets/images/avatar.svg';
import firebase from 'firebase';
const Header = (props) => {
  const [user, setUser] = useState();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (_usr) => {
      if (!_usr) {
        props.data.history.push(`/`);
      } else {
        setUser(_usr);
      }
    });
  }, []);
  const logout = (e) => {
    firebase.auth().signOut();
    props.data.history.push(`/`);
  };
  return (
    <>
      <div className="header-full-screen ">
        <div className="left-container">
          <div style={{ marginLeft: '41px' }}>
            <img src={logo} alt="My Awesome" />
            <br />
            <div style={{ marginTop: '-5px' }}>
              <img src={logo} alt="My Awesome" />
              <img style={{ marginLeft: '4px' }} src={logo} alt="My Awesome" />
            </div>
          </div>
          <div className="logo">
            <h3>Logo</h3>
          </div>
        </div>
        <div className="right-container">
          <div>
            <img className="circle-img" src={avtar} alt="" />
          </div>
          <div style={{ marginTop: '12px' }}> {user ? user.email : ''}</div>
          <i
            onClick={logout}
            class="fa fa-sign-out select"
            aria-hidden="true"
          ></i>
        </div>
      </div>
    </>
  );
};
export default Header;
