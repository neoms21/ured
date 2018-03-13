import React from 'react';

/**
 * Checkbox
 * @description Checkbox component
 * @prop name {string} - name of input field
 * @prop value {string} - value for input field
 * @prop label {node} - label for input
 * @prop checked {bool} - state of the input
 * @prop blockBackground {bool} - if true will include the css class block-background
 * @prop dataSelector {string} - id used for BDD scripts
 * @prop className {string} - class added to the label
 * @prop title {string} - title added to the checkbox input
 * @prop onChange {func} - fired when the checkbox is changed
 * @prop fieldKey {string} - id passed back from onChange event
 * @example <Checkbox className="custom-button-class" label="Sample Checkbox" />
 */

const propTypes = {
  name: React.PropTypes.string,
  value: React.PropTypes.string,
  checked: React.PropTypes.bool,
  fieldKey: React.PropTypes.string,
  dataSelector: React.PropTypes.string,
  onChange: React.PropTypes.func,
};

const defaultProps = {
  name: '',
  value: '',
  label: '',
  checked: false,
  fieldKey: '',
  dataSelector: '',
  onChange: undefined,
};

class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.checked,
      focused: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.checked !== nextProps.checked) {
      this.setState({ checked: nextProps.checked });
    }
  }

  onChange(e) {
    this.setState({
      checked: e.target.checked,
    });
    if (this.props.onChange) {
      this.props.onChange(this.props.fieldKey, e.target.checked);
    }
  }

  render() {
    return (
      <div className="checkbox">
        <input
          type="checkbox"
          id={`${this.props.dataSelector}-check-box`}
          data-selector={this.props.dataSelector}
          name={this.props.name}
          value={this.props.value}
          onChange={e => this.onChange(e)}
          checked={this.state.checked}
        />
        <label
          htmlFor={`${this.props.dataSelector}-check-box`}
          data-selector={`${this.props.dataSelector}-label`}
          name={`${this.props.dataSelector}-label`}
        />
      </div>
    );
  }
}

Checkbox.defaultProps = defaultProps;
Checkbox.propTypes = propTypes;


export default Checkbox;
