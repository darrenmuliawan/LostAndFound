import React from 'react';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries} from 'react-vis';
import '../../node_modules/react-vis/dist/style.css';

const LineChart = (props) => {
    let dict = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0
    }
    
    console.log(props);
    let items = props.items;
    items = items.filter(item => item.category === props.filter);
    let i = 0;
    for (i = 0; i < items.length; i++) {
        let d = new Date(items[i].date);
        console.log(items[i].date, d.getMonth());

        if (d.getMonth() !== NaN) {
            dict[d.getMonth() + 1] += 1
        }
    }
    
    let data = [
        {x: 'Jan', y: dict[1]},
        {x: 'Feb', y: dict[2]},
        {x: 'Mar', y: dict[3]},
        {x: 'Apr', y: dict[4]},
        {x: 'May', y: dict[5]},
        {x: 'Jun', y: dict[6]},
        {x: 'Jul', y: dict[7]},
        {x: 'Aug', y: dict[8]},
        {x: 'Sep', y: dict[9]},
        {x: 'Oct', y: dict[10]},
        {x: 'Nov', y: dict[11]},
        {x: 'Dec', y: dict[12]},
    ]
    console.log(data);
    
    return (
        <XYPlot
            xType='ordinal'
            width={500}
            height={500} 
            yDomain={[0, 15]}
            >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis title={props.x}/>
            <YAxis title={props.y}/>
            <LineSeries
                data={data}/>
        </XYPlot>
    );
}

export default LineChart;