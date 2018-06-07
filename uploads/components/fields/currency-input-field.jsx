import React,{Component} from 'react';
import styles from './input-field.scss';
import formStyles from '../../sass/forms.scss';
import Tooltip from '../../components/Tooltip/tooltip';


export default class CurrencyInputField extends Component {
    constructor(props) {
      super(props);
      this.state = { fieldValue: props.fieldValue };
    }
  
    onChange = e => {
      this.setState({ fieldValue: e.target.value });
      this.props.input.onChange(e.target.value);
    };
  
    onBlur = e => {
      this.props.input.onBlur();
    };
  
    componentDidMount() {
      this.props.input.value = this.props.fieldValue;
    }
  
    render() {
      const {
        meta: { touched, error },
        label,
        input,
        id,
        errorText,
        placeholder,
        helpText,
        hideLabel,
      } = this.props;
      return (
        <div>
        <div className={`${styles.tfContainer} `}>

            {!hideLabel && <div className={formStyles["label-container"]}>
                <label>{label}</label>
                {helpText && <Tooltip iconName="question-circle" text={helpText}/>}
            </div>}

            <div
                className={`${formStyles["currency-container"]} col-lg-4 col-md-5 col-sm-6 col-xs-12 ${touched && error ? 'input-error' : ''}`}>
                <span className={formStyles.currency}>£</span>
                <input id={`txt-${id}`}
                       placeholder={placeholder}
                       className={`${formStyles["currency-input"]} `}
                       {...input}
                       onChange={this.onChange}
                      
                       type="text"/>

            </div>

            {touched && (error) && <div
                className='form-error col-lg-4 col-md-5 col-sm-6 col-xs-12'>{error && typeof error === 'string' ? error : errorText}</div>}
        </div>
    </div>
      );
    }
  }
  

