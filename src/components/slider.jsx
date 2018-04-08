import React, { Component } from 'react';
import styles from './slider.css';
import reactLogo from '../assets/images/marker.png';

const css = {
	transition: 'left .1s linear'
};

class Volume extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			volume: 0,
			position: 'absolute',
			left: '20px'
		};
	}

	handleOnChange = (e) => {
		console.log(e.target.id);
		console.log();
		this.setState({
			left: e.target.getBoundingClientRect().left / 2
		});
	};
	handleImageClick = () => {
		this.setState({
			left: '40px'
		});
	};

	render() {
		console.log(reactLogo);
		let { volume } = this.state;
		return (
			<div className={styles.container}>
				<img
					style={{ ...css, position: this.state.position, left: this.state.left, width: 30, height: 30 }}
					src={reactLogo}
					onClick={this.handleImageClick}
					alt="marker"
				/>
				<div className={styles.stepLabels}>
					<div className={`${styles.stepLabel} ${styles['first-step']}`}>Low</div>
					<div className={`${styles.stepLabel}`}>Low to Medium </div>
					<div className={`${styles.stepLabel}`}>Medium</div>
					<div className={`${styles.stepLabel}`}>Medium to high </div>
					<div className={`${styles.stepLabel}`}>High </div>
				</div>
				<div className={styles.slider}>
					<div id="1" className={`${styles.step}`} onClick={this.handleOnChange} />
					<div id="2" className={`${styles.step}`} onClick={this.handleOnChange} />
					<div id="3" className={`${styles.step}`} onClick={this.handleOnChange} />
					<div id="4" className={`${styles.step}`} onClick={this.handleOnChange} />
					<div id="5" className={`${styles.step}`} onClick={this.handleOnChange} />
				</div>
			</div>
		);
	}
}

export default Volume;
