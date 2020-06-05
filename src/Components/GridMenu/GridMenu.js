import React, {useState, useEffect} from 'react';
import styles from "./GridMenu.module.css";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ColorPicker from "../ColorPicker/ColorPicker";
import TextField from '@material-ui/core/TextField';
import cyan from '@material-ui/core/colors/cyan';
import lime from "@material-ui/core/colors/lime";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {ThemeProvider} from "@material-ui/styles";

const theme = createMuiTheme({
    palette: {
        primary: cyan,
        secondary: lime
    }
});
const useStyles = makeStyles({
    numberField: {
        position: 'relative',
        width: 45,
        color: 'white',
        marginLeft: 10,
        marginRight: 10,
        float: 'left'
    },
    inputLabel: {
        color: 'white'
    },
    input: {
        background: 'white',
        paddingLeft: 10
    }
});


const GridMenu = (props) => {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [colorPickerLocation, setColorPickerLocation] = useState(null);
    const [nRows, setNRows] = useState(6);
    const [nColumns, setNColumns] = useState(6);

    const classes = useStyles();

    useEffect(() => {
        props.setGridProps({
            ...props.gridProps,
            nRows: nRows
        })
    }, [nRows]);

    useEffect(() => {
        props.setGridProps({
            ...props.gridProps,
            nColumns: nColumns
        })
    }, [nColumns]);

    const openColorPicker = (e) => {
        setColorPickerLocation([e.clientX, e.clientY]);
        setShowColorPicker(true)
    };

    const updateColor = (color, index) => {
        props.setGridProps({
            ...props.gridProps,
            color: color
            })
    };



    return (
        <div className={styles.GridMenu}>
            <Button onClick={() => props.setGridOn(!props.gridOn)} className={`${styles.gridButton} ${props.gridOn ? props.classes.buttonSelected : props.classes.buttonUnselected}`}>
                Grid
            </Button>
            <div className={styles.swatch} style={{backgroundColor: props.gridProps.color}} onClick={openColorPicker}>
            </div>
            {showColorPicker ? (
                <ColorPicker

                    {...props}
                    showColorPicker={showColorPicker}
                    setShowColorPicker={setShowColorPicker}
                    location={colorPickerLocation}
                    updateColor={updateColor}
                />
            ) : null}
            <div className={styles.numInputs}>
                <ThemeProvider theme={theme}>
                    <TextField
                        className={classes.numberField}
                        id="standard-number"
                        label="Rows"
                        type="number"
                        defaultValue={5}
                        value={nRows}
                        InputLabelProps={{
                            shrink: true,
                            className: classes.inputLabel
                        }}
                        inputProps={{
                            className: classes.input
                        }}
                        onChange={(e) => {
                            let val = parseInt(e.target.value);
                            if (val < -1) {
                                val = -1
                            }
                            else if (val > 40) {
                                val = 40
                            }
                            setNRows(val)
                        }}
                        disabled={!props.gridOn}
                        size={'small'}
                    />
                    <TextField
                        className={classes.numberField}
                        id="standard-number"
                        label="Columns"
                        type="number"
                        defaultValue={5}
                        color={'secondary'}
                        value={nColumns}
                        InputLabelProps={{
                            shrink: true,
                            className: classes.inputLabel
                        }}
                        inputProps={{
                            className: classes.input
                        }}
                        onChange={(e) => {
                            let val = parseInt(e.target.value);
                            if (val < -1) {
                                val = -1
                            }
                            else if (val > 40) {
                                val = 40
                            }
                            setNColumns(val)
                        }}
                        disabled={!props.gridOn}
                        size={'small'}
                    />
                </ThemeProvider>
            </div>
        </div>
    )
};


export default GridMenu;