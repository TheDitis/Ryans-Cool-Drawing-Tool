import React from 'react';
import styles from './LineProfiles.module.css'
import uuid from "react-uuid";


const LineProfile = (props) => {
    const line = props.line;
    return (
        <div className={styles.LineProfile} key={uuid()}>
            <div className={styles.leftSide}>
                <div className={styles.swatch} style={{backgroundColor: 'red'}}>
                </div>
            </div>
            <div className={styles.rightSide}>
                <div className={styles.topSection}>

                </div>

                <hr/>

                <div className={styles.bottomSection}>
                    <a>Length: </a>
                    <div className={styles.numberContainer}>
                        <h5 className={styles.number}>{line.length}</h5>
                    </div>
                    {line.angle ? (
                        <React.Fragment>
                            <a>Angle</a>
                            <div className={styles.numberContainer}>
                                <h5 className={styles.number}>{line.angle.toFixed(1)}</h5>
                            </div>
                        </React.Fragment>
                    ) : null}
                </div>
            </div>
        </div>
    )
}


export default LineProfile