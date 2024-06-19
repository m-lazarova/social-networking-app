import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

const Backdrop = ({ open, onClick }) => {
  return ReactDOM.createPortal(
    <div
      className={`backdrop ${open ? 'open' : ''}`}
      onClick={onClick}
    />,
    document.getElementById('backdrop-root')
  );
};
export default Backdrop;
