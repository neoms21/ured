import React from 'react';
import PropTypes from 'prop-types';

const SegmentedControl = ({ input, disabled, heading, required, className, items, name, meta: { touched, error } }) => {
   console.log(error    );
   return( <fieldset className={`form__field ${className || ''}`}>

        <legend className="form__label">
            {heading}{required ? (<span>*</span>) : null}
            { (touched && error) ? (
                <span className="form__error"> {error}</span>
            ) : null }
        </legend>

        <div>
        { items.map((item, i) => (
            <div className="form__segmented-control width-1/2@small" key={ i }>
                <input
                    {...input}
                    name={ name }
                    type="radio"
                    value={ item.value }
                    disabled={ disabled }
                    checked={ input.value === item.value }
                    className="segmented-control__input u-option-bg-current"
                    id={ `${name}-${item.value}` }
                />
                <label className="segmented-control__label u-adjacent-current" htmlFor={ `${name}-${item.value}` }>
                    {item.label}
                </label>
            </div>
        ))
        }
        </div>
    </fieldset>);
}

SegmentedControl.propTypes = {
    input: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired,
    })).isRequired,
    heading: PropTypes.string,
    meta: PropTypes.object,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
};

export default SegmentedControl;