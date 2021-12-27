import React from 'react';
import { Link } from 'react-router-dom';
import './index.less';

export default () => {
  return (
    <>
      <div>Current is Home</div>
      <Link className="about" to="/about">
        go To About
      </Link>
    </>
  );
};
