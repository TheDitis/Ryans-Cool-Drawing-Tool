import React from "react";
import styles from './Sidebar.module.css'
import ImageUploader from "react-images-upload";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import StraightLineProfile from "../LineProfiles/StraightLineProfile/StraightLineProfile";
import PolyLineProfile from "../LineProfiles/PolyLineProfile/PolyLineProfile";
import uuid from 'react-uuid'
import ToolsMenu from "../ToolsMenu/ToolsMenu";
import Tooltip from '@material-ui/core/Tooltip'


const useStyles = makeStyles({
    buttonUnselected : {
        backgroundColor: "white",
        margin: 10,
        marginLeft: 20,
        marginRight: 20
    },
    buttonSelected: {
        backgroundColor: "rgba(80, 80, 80, 1)",
        color: 'white',
        margin: 10,
        marginLeft: 20,
        marginRight: 20
    }
});


const SideBar = (props) => {

    const classes = useStyles();

    return (
        <div className={styles.sidebar} style={{width: props.sideBarWidth}}>
            <div className={styles.topSection}>
                <hr style={{width: "100%"}}/>
                <div className={styles.upperControlsTopRow}>
                    <Tooltip title={"Undo"} enterDelay={1300}>
                        <Button
                            onClick={props.undo}
                            style={{
                                backgroundColor: "white",
                                height: 30,
                                width: 20,
                                marginTop: 18,
                                marginLeft: props.sideBarWidth * 0.25 - 65,
                                position: 'absolute'
                            }}
                        >
                            <UndoIcon/>
                        </Button>
                    </Tooltip>
                    <ImageUploader
                        buttonText='Choose image'
                        onChange={props.handleUpload}
                        imgExtension={['.jpg', '.jpeg', '.gif', '.png', '.gif']}  // allowed file extensions
                        maxFileSize={20971520}
                        withIcon={false}
                        withLabel={false}
                        singleImage={false}
                        buttonStyles={{backgroundColor: 'rgb(0, 150, 255)'}}
                        fileContainerStyle={{
                            backgroundColor: 'transparent',
                            height: 10,
                            width: 140,
                            margin: 'auto',
                            marginTop: 8,
                            marginBottom: 0
                        }}
                    />
                    <Tooltip title={"Redo"} enterDelay={1300}>
                        <Button
                            onClick={props.redo}
                            style={{
                                backgroundColor: "white",
                                height: 30,
                                marginTop: 18,
                                marginLeft: props.sideBarWidth - (props.sideBarWidth * 0.25),
                                position: 'absolute'
                            }}
                            disabled={props.redoBuffer.length === 0}
                        >
                            <RedoIcon/>
                        </Button>
                    </Tooltip>
                </div>
                <Button onClick={() => props.setDrawMode('line')} className={props.drawMode === 'line' ? classes.buttonSelected : classes.buttonUnselected}>Line</Button>
                <Button onClick={() => props.setDrawMode('poly')} className={props.drawMode === 'poly' ? classes.buttonSelected : classes.buttonUnselected}>Poly</Button>

                <hr style={{width: "100%"}}/>
            </div>
            <div className={styles.profiles}>
                {props.lineList.map( (line, index) => {  // for each line in the lineList:
                    switch (line.type) {
                        case 'line':  // if it's a straight line, render a straight line profile
                            return <StraightLineProfile key={uuid()} line={line} index={index} {...props}/>;
                        case 'poly':  // if it's a poly line, render a poly line profile
                            return <PolyLineProfile key={uuid()} line={line} index={index} {...props}/>;
                        default:
                            console.log("ERROR: Line type not recognized. See switch statement in SideBar Component");
                            break;
                    }
                })}
            </div>
            <ToolsMenu {...props} classes={classes}/>
        </div>
    )
};

export default SideBar;