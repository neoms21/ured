import React, {Component} from 'react';
import './linear-dropdown.css';
import * as _ from 'lodash';

import PropTypes from 'prop-types';

import FontAwesome from 'react-fontawesome'

// import faStyles from '../../node_modules/font-awesome/css/font-awesome.css'

class LinearDropdown extends Component {


    constructor(props) {
        super(props);
        this.state = {
            selectedItem: this.props.selectedItem, showHiddenItems: false, hiddenListStyle: {
                display: 'inline',
                position: 'absolute',
                zIndex: 9999
            }
        };
    }


    hiddenList = (items, itemsToShow) => {
        return (
            <div key="hkjsk" className="hidden-list" style={this.state.hiddenListStyle}>
                {_.takeRight(items, items.length - itemsToShow).map((item, index) => <div  onClick={() => {
                    this.selectValue(item);
                }}
                                                                                          className="hidden-list-item"
                                                                                          key={index}>{item.value}</div>)}
            </div>
        )
    };

    selectValue = (item) => {
        console.log(item);

        // this.props.input.value = item.value;
        this.setState({showHiddenItems: false});
        this.props.input.onChange(item.value);
    };


    showHiddenList = (e) => {
        // console.log(e.currentTarget.clientHeight, e.currentTarget.getBoundingClientRect(),
        //     document.documentElement.scrollTop);
        this.setState({
            showHiddenItems: !this.state.showHiddenItems,
            hiddenListStyle: {
                ...this.state.hiddenListStyle,
                top: document.documentElement.scrollTop + e.currentTarget.getBoundingClientRect().bottom + 2,
                left: e.pageX - e.nativeEvent.offsetX
            }
        });
    };


    render() {
        const {items, itemsToShow, meta: {touched, error}} = this.props;

        const {onBlur} = this.props.input;
        console.log(touched, error);

        return (

            [<div className="sep">
                just a random div
            </div>,
                <div>
                    <span>Select marital status </span>
                    <div className="list-container">
                        {_.take(items, itemsToShow).map((item, index) => <div onBlur={()=>onBlur()} onClick={() => {
                            this.selectValue(item);
                        }} className="list-item"
                           key={index}>{item.value}</div>)}

                        <div key="other" className="list-item" onClick={this.showHiddenList} onMouseDown={this.onMouseDown}>Other
                            <FontAwesome
                                className="super-crazy-colors"
                                name="chevron-down"
                                spin
                            />
                        </div>

                        {this.state.showHiddenItems && this.hiddenList(items, itemsToShow)}

                        {touched && error && <span>ERROR!!!!</span>}

                    </div>
                </div>]
        )
    }

}

LinearDropdown.propTypes = {
    items: PropTypes.array,
    itemsToShow: PropTypes.number
};

LinearDropdown.defaultProps = {
    items: [],
    itemsToShow: 3
};

export default LinearDropdown;