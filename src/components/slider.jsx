import React, {Component} from "react";
import styles from './slider.css';

class Volume extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            volume: 0
        }
    }

    handleOnChange = (value) => {
        this.setState({
            volume: value
        })
    };

    render() {
        console.log(styles);
        let {volume} = this.state;
        return (
            <div>
                <div className={styles.stepLabels}>
                    <div className={`${styles.stepLabel} ${styles["first-step"]}`}>Low</div>
                    <div className={`${styles.stepLabel}`}>Low to Medium </div>
                    <div className={`${styles.stepLabel}`}>Medium</div>
                    <div className={`${styles.stepLabel}`}>Medium to high </div>
                    <div className={`${styles.stepLabel}`}>High </div>
                </div>
                <div className={styles.slider}>
                    <div className={`${styles.step}`}/>
                    <div className={`${styles.step}`}/>
                    <div className={`${styles.step}`}/>
                    <div className={`${styles.step}`}/>
                    <div className={`${styles.step}`}/>
                </div>
            </div>
        )
    }
}

export default Volume;