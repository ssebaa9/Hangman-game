import React from 'react';
import { connect } from 'react-redux';

const modal = (props) => {

  const showModal = {
    opacity: 1,
    transform: 'translateY(0)'
  }

  const closeModal = {
    opacity: 0,
    transform: 'translateY(-100%)'
  }

  return (
    <div className="Modal" style={props.showModal ? showModal : closeModal}>
      <div className="Modal__inside">
        {props.children}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    showModal: state.showModal
  }
}

export default connect(mapStateToProps)(modal);

