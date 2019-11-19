import React from 'react';

const button = (props) => {
  return (
    <button className={props.class} onClick={props.clicked}>{props.children}</button>
  );
}

export default button;