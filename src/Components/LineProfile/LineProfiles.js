import React, {useState} from 'react';
import styles from './LineProfiles.module.css'
import uuid from "react-uuid";
import ColorPicker from "../ColorPicker/ColorPicker";
import Button from '@material-ui/core/Button'

const LineProfile = (props) => {
    const [showColorPicker, setShowColorPicker] = useState(false);

    const line = props.line;
    return (
        <React.Fragment>
            <div className={styles.LineProfile} key={uuid()}>
                <div className={styles.leftSide}>
                    <div className={styles.swatch} style={{backgroundColor: line.color}} onClick={() => setShowColorPicker(true)}>
                    </div>
                </div>

                <div className={styles.rightSide}>
                    <div className={styles.topSection}>
                        <h3 className={styles.lineTitle}>Line {props.index}</h3>
                        <Button className={styles.unitSelect} onClick={() => props.setUnit(line.length)}>Unit</Button>
                        <a className={styles.deleteButton} onClick={() => props.removeLine(props.index)}>×</a>
                    </div>

                    <hr/>

                    <div className={styles.bottomSection}>
                        <a>Length: </a>
                        <div className={styles.numberContainer}>
                            <h5 className={styles.number}>{(line.length / props.unit).toFixed(2)}</h5>
                        </div>
                        <React.Fragment>
                            <a>Angle</a>
                            <div className={styles.numberContainer}>
                                <h5 className={styles.number}>{line.angles.length > 0 ? line.angles[0].toFixed(0) : 0}°</h5>
                            </div>
                        </React.Fragment>
                    </div>
                </div>
            </div>
            {showColorPicker ? (
                <ColorPicker
                    showColorPicker={showColorPicker}
                    setShowColorPicker={setShowColorPicker}
                    {...props}
                />
                ) : null}
            {/*<ColorPicker/>*/}
        </React.Fragment>
    )
}


export default LineProfile