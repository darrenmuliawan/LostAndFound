import React from 'react';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalBarSeries} from 'react-vis';
import '../../node_modules/react-vis/dist/style.css';

let data = 
[
    { "y": 100, "x": "Jan" },
    { "y": 112, "x": "Feb" },
    { "y": 230, "x": "Mar" },
    { "y": 268, "x": "Apr" },
    { "y": 300, "x": "May" },
    { "y": 310, "x": "Jun" },
    { "y": 315, "x": "Jul" },
    { "y": 340, "x": "Aug" },
    { "y": 388, "x": "Sep" },
    { "y": 404, "x": "Oct" },
    { "y": 442, "x": "Nov" },
    { "y": 447, "x": "Dec" }
]

const BarGraph = (props) => {
    return (
        <XYPlot
            xType="ordinal"
            width={500}
            height={500} 
            >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis title={props.x}/>
            <YAxis title={props.y}/>
            <VerticalBarSeries
                data={data}
            />
        </XYPlot>
    );
}

export default BarGraph;