import React, { Component } from "react";
import styles from "../about-you.scss";
import AddressComponent from "./address";
import YesNo from "../../common/yes-no";

import ReactDOM from "react-dom";

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = { extraAddressAnswered: props.addresses.length > 0 };
  }

  componentDidMount() {
    this.props.setTracker();

    if (!this.props.loadComplete) {
      this.props.fetchAddresses();
    }
    if (!this.props.refDataLoaded) this.props.fetchListData(["countries"]);
  }

  handleRemove = index => {
    this.props.removeAddress(index, this.props.formValues);
    const element = ReactDOM.findDOMNode(this);
    if (element != null) {
      window.scrollTo(0, 400);
    }
  };

  render() {
    const { loadComplete, countries, fieldNames, fields } = this.props;
    return (
      <div className={styles.content}>
        <h2>Address(es)</h2>

        <div className={styles.subHeading}>Home Address</div>
        {loadComplete &&
          this.props.addresses.map((a, i) => (
            <div key={`address${i}`}>
              {i !== 0 && (
                <div className={styles.subHeading}>Previous Address</div>
              )}
              <AddressComponent
                fields={a.fields}
                onRemove={this.handleRemove}
                countries={countries}
                fieldNames={fieldNames}
                index={i + 1}
              />

              {i === 0 && (
                <YesNo
                  fields={fields}
                  fieldName="livedOver3Years"
                  onSelect={val => {
                    if (!val.id) {
                      this.props.reset();
                      this.props.showAdditionalAddress(this.props.formValues);
                    } else if (this.props.addresses.length === 2) {
                      this.handleRemove(2);
                    }
                  }}
                />
              )}
            </div>
          ))}
      </div>
    );
  }
}

export default Address;
