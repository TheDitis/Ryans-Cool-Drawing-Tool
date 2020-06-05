import React from 'react'
import {Layer, Line} from 'react-konva';
import uuid from 'react-uuid';
import _ from 'lodash';

const Grid = (props) => {

    const makeFlatLines = (numVert, numHor, width, height) => {
         const range = n => [...Array(n).keys()];
         const wInterval = width / numVert;
         const hInterval = height / numHor;
         const verticalXs = Array.from(range(numVert + 1), x => x * wInterval);
         const horizontalYs = Array.from(range(numHor + 1), x => x * hInterval);

         const verticalLines = _.map(verticalXs, (x) => {
             return [Math.round(x), 0, Math.round(x), Math.round(height)]
         });
        const horizontalLines = _.map(horizontalYs, (y) => {
            return [0, Math.round(y), Math.round(width), Math.round(y)]
        });
        return [verticalLines, horizontalLines]
    };

    const makeDiagonalLines = (vertical, horizontal) => {
        const sides = [vertical, horizontal];
        const [longer, shorter] = sides.sort((a, b) => b.length - a.length);

        let list = []
        const upLines = _.map(longer, (_, index) => {
            if (index < shorter.length - 1) {
                const line1 = [
                    longer[index][0],
                    longer[index][1],
                    shorter[index][0],
                    shorter[index][1]
                ];
                const line2 = [
                    longer[longer.length - (index + 1)][2],
                    longer[longer.length - (index + 1)][3],
                    shorter[shorter.length - (index + 1)][2],
                    shorter[shorter.length - (index + 1)][3]
                ];
                return [line1, line2]
            }
            else {
                const altIndex = (index - shorter.length + 1) % longer.length;
                let line1 = [
                    longer[index][0],
                    longer[index][1],
                    longer[altIndex][2],
                    longer[altIndex][3]
                ];
                return [line1, null]
            }
        });

        const downLines = _.map(longer, (_, index) => {
            if (index < shorter.length - 1) {
                const line1 = [
                    longer[index][2],
                    longer[index][3],
                    shorter[shorter.length - (index + 1)][0],
                    shorter[shorter.length - (index + 1)][1]
                ];
                const line2 = [
                    longer[longer.length - (index + 1)][0],
                    longer[longer.length - (index + 1)][1],
                    shorter[index][2],
                    shorter[index][3]
                ];
                return [line1, line2]
            }
            else {
                const altIndex = (index - shorter.length + 1) % longer.length;
                const line1 = [
                    longer[altIndex][0],
                    longer[altIndex][1],
                    longer[index][2],
                    longer[index][3]
                ];
                return [line1, null]
            }
        });
        let allLines = _.flatten([_.flatten(upLines), _.flatten(downLines)]);
        return allLines;
    };

    const [verticalLines, horizontalLines] = makeFlatLines(props.nColumns, props.nRows, props.width, props.height);

    let diagonalLines= makeDiagonalLines(verticalLines, horizontalLines);


    return (
        <Layer>
            {horizontalLines.map((line) => {
                return (
                    <Line key={uuid()} x={0} y={0} stroke={props.color} points={line} strokeWidth={props.strokeWidth} opacity={props.opacity}/>
                )
            })}
            {verticalLines.map((line) => {
                return (
                    <Line key={uuid()} x={0} y={0} stroke={props.color} points={line} strokeWidth={props.strokeWidth} opacity={props.opacity}/>
                )
            })}
            {diagonalLines.map((line) => {
                return (
                    <Line key={uuid()} x={0} y={0} stroke={props.color} points={line} strokeWidth={props.strokeWidth} opacity={props.opacity}/>
                )
            })}
        </Layer>
    )
};

export default Grid;
