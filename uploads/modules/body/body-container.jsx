import React, { Component } from "react";
import styles from "./body.scss";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { fetchPages, broadcastWindowSize } from "../tracker/tracker-actions";

import Modal from "../../components/modal/modal";
import Bac from "../banks/bank-accounts-modal-container";

export class Body extends Component {
  updateDimensions = () => {
    if (this.props.history.location.pathname.indexOf("dashboard") === -1)
      this.props.broadcastWindowSize(window.innerWidth);
  };

  componentDidMount() {
    if (!this.props.pagesLoaded) {
      const path = this.props.history.location.pathname.split("/");
      if (path.length > 2) {
        this.props.fetchPages(path[1], this.props.history.location.pathname);
      }
    }
    window.addEventListener("resize", this.updateDimensions);
    if (this.props.history.location.pathname.indexOf("dashboard") === -1)
      this.props.broadcastWindowSize(window.innerWidth);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    const { showModal, component } = this.props;

    const Component = this.props.component;
    return (
      <div className={styles.app}>
        {showModal && (
          <Modal show={true} onClose={this.toggleModal}>
            <Component />
          </Modal>
        )}
        <div className={`container ${styles.children}`}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    showModal: state.body.showModal,
    component: state.body.component
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPages: (key, currentPath) => dispatch(fetchPages(key, currentPath)),
    broadcastWindowSize: size => dispatch(broadcastWindowSize(size))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Body)
);
