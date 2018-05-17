import React, { Component } from "react";
import PropTypes from "prop-types";
import YesNo from "../../common/yes-no";
import styles from "../advisers.scss";
import Icon from '../../../components/font-awesome/Icon';

class ThirdParty extends Component {
  componentDidMount() {
    this.props.setTracker();
    if (!this.props.loadComplete) {
      this.props.fetchThirdParty();
    }
  }

  render() {
    const { fields, loadComplete, haveThirdParty } = this.props;

    return (
      <div>
        <h2 className={styles.heading}>
          Instructions from a third party (including a spouse)
        </h2>

        {loadComplete && (
          <div>
            <div className="sub-heading">
              If you wish us to accept the instructions of a nominated third
              party as well as your instructions, or if you have granted a
              formal power of attorney to a third party, please indicate below.
            </div>

            <YesNo fields={fields} fieldName="thirdPartyAuthorization" />

            {haveThirdParty && (
              <div className={styles.container}>
                <div className="sub-heading">
                  Download the Third party authorisation form and complete for
                  each person you wish to nominate.
                </div>

                <a className={styles.download} href="">
                  <Icon iconName="file-pdf"   regular={true}/>
                  Third party authorisation form
                </a>
                <div className={`bold-text ${styles.post}`}>
                  Post the completed form to Mark Kent, Customer Service
                  Executive, Cazenove Capital, 12 Moorgate, London EC2R 6DA
                </div>
                <div className={styles.fields} />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

ThirdParty.propTypes = {
  fetchThirdParty: PropTypes.func,
  saveThirdParty: PropTypes.func,
  fields: PropTypes.object,
  loadComplete: PropTypes.bool
};

ThirdParty.defaultProps = {
  fields: {},
  loadComplete: false,
  fetchThirdParty: undefined,
  saveThirdParty: undefined
};

export default ThirdParty;
