import React from 'react';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalBarSeries, ChartLabel} from 'react-vis';
import '../../node_modules/react-vis/dist/style.css';




const BarGraph = (props) => {
    let dict = {
        'Electronic': 0,
        'Book': 0,
        'Bag/Purse/Wallet': 0,
        'Credit/Debit Card': 0,
        'Cell Phone': 0,
        "Driver's License/ID": 0,
        'Glasses': 0,
        'Jewelry': 0,
        'Keys': 0,
        'Laptop': 0,
        'Other': 0
    }
    
    console.log(props.items);
    props.items.map(i => {
        dict[i.category] += 1;
    })

    let data = [
        {
            x: 'Electronic', y: dict['Electronic']
        },
        {
            x: 'Book', y: dict['Book']
        },
        {
            x: 'Bag/Purse/Wallet', y: dict['Bag/Purse/Wallet']
        },
        {
            x: 'Credit/Debit Card', y: dict['Credit/Debit Card']
        },
        {
            x: 'Cell Phone', y: dict['Cell Phone']
        },
        {
            x: "Driver's License/ID", y: dict["Driver's License/ID"]
        },
        {
            x: 'Glasses', y: dict["Glasses"]
        },
        {
            x: 'Jewelry', y: dict["Jewelry"]
        },
        {
            x: 'Keys', y: dict["Keys"]
        },
        {
            x: 'Laptop', y: dict["Laptop"]
        },
        {
            x: 'Other', y: dict["Other"]
        },
    ];

    return (
        <XYPlot
            xType="ordinal"
            width={500}
            height={500} 
            yDomain={[0, 15]}
            >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis title={props.x}/>
            <YAxis title={props.y}/>
            <ChartLabel 
                text="X Axis"/>
            <VerticalBarSeries
                data={data}
                
            />
        </XYPlot>
    );
}

export default BarGraph;