import React from 'react';
import './errors.css';

function NotFound() {
  return (
    <>
      <section className="cstm404-sec">
        <div className="cstm404-container">
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="main">
            <h1 herf="/">404</h1>
            <p>
              It looks like you're lost...
              <br />
              That's a trouble?
            </p>
            <button type="button" className="cstm-btn solid-btn">
              Go back
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
export default NotFound;
