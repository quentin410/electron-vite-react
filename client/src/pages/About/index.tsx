import React from 'react';
import { Link } from 'react-router-dom';
import './index.less';

export default () => {
  return (
    <>
      <div>Current is About</div>
      <Link className="home" to="/home">
        go To Home
      </Link>
    </>
  );
};
