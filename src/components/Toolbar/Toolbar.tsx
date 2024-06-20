import React from "react";

import './Toolbar.css'

const Toolbar = (props) => {
    return <div className="toolbar">
        {props.children}
    </div>
}

export default Toolbar;