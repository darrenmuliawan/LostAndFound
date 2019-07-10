import React from 'react';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries} from 'react-vis';
import '../../node_modules/react-vis/dist/style.css';

const LineChart = (props) => {
    return (
        <XYPlot
            width={500}
            height={500} 
            >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis title={props.x}/>
            <YAxis title={props.y}/>
            <LineSeries
                data={[
                    {x: 1, y: 4},
                    {x: 5, y: 2},
                    {x: 15, y: 6}
                ]}/>
        </XYPlot>
    );
}

export default LineChart;