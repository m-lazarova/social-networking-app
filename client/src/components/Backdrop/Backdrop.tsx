import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

const Backdrop = (props ) => {
  return ReactDOM.createPortal(
    <div
      className={`backdrop ${props.open ? 'open' : ''}`}
      onClick={props.onClick}
    />,
    document.getElementById('backdrop-root')! as HTMLElement,
  );
};
export default Backdrop;
