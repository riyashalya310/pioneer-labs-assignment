import React, { Component } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Legend,
    ResponsiveContainer,
    CartesianGrid,
    Tooltip,
    Rectangle,
    PieChart, Pie, Cell,
} from "recharts"
import './index.css'

class PopulationData extends Component {
    state = {
        population: [],
        barChartDisplay: true,
        pieChartDisplay: false
    }

    componentDidMount() {
        this.getPopulation()
    }

    getPopulation = async () => {
        const api = 'https://datausa.io/api/data?drilldowns=Nation&measures=Population'
        const options = {
            method: 'GET'
        }
        const response = await fetch(api, options)
        if (response.ok) {
            const data = await response.json()
            const filteredData = data.data.map((obj) => ({
                year: obj['Year'],
                population: obj.Population
            }))
            this.setState({ population: filteredData })
        }
        else {
            console.log('Error occured while fetching task 2 API')
        }
    }

    onClickBar = () => {
        this.setState({ barChartDisplay: true, pieChartDisplay: false })
    }

    onClickPie = () => {
        this.setState({ pieChartDisplay: true, barChartDisplay: false })
    }

    DataFormatter = (number) => {
        if (number > 1000) {
            return `${(number / 1000).toString()}k`
        }
        return number.toString()
    }

    render() {
        const { population, barChartDisplay, pieChartDisplay } = this.state
        return (
            <div className='outer-container'>
                <div className='container'>
                    {barChartDisplay && <ResponsiveContainer width="90%" height={500}>
                        <h1>Population Bar Chart Showing population over the years</h1>
                        <h2>As bar chart</h2>
                        <BarChart
                            data={population}
                            margin={{
                                top: 5,
                            }}
                        >
                            <XAxis
                                dataKey="year"
                                tick={{
                                    stroke: "gray",
                                    strokeWidth: 1,
                                }}
                                label={{ value: 'Population', position: 'insideBottomRight', offset: 0 }} scale="band"
                            />

                            <YAxis
                                tickFormatter={this.DataFormatter}
                                tick={{
                                    stroke: "gray",
                                    strokeWidth: 0,
                                }}
                                dataKey="year"
                                label={{ value: 'Index', angle: -90, position: 'insideLeft' }}
                            >
                            </YAxis>

                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#ccc"
                            />

                            <Legend
                                wrapperStyle={{
                                    padding: 30,
                                }}
                            />
                            <Tooltip />
                            <Bar dataKey="population" name="population" fill="#1f77b4" barSize="20%" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                        </BarChart>
                    </ResponsiveContainer>}
                    {pieChartDisplay && <ResponsiveContainer width="100%" height={300}>
                        <h1>Population Bar Chart Showing population over the years</h1>
                        <h2>As Pie chart</h2>
                        <PieChart>
                            <Pie
                                cx="70%"
                                cy="40%"
                                data={population}
                                startAngle={0}
                                endAngle={360}
                                innerRadius="40%"
                                outerRadius="70%"
                                dataKey="population"
                            >
                                <Cell name="2021" fill="#FF6663" />
                                <Cell name="2020" fill="#FFB399" />
                                <Cell name="2019" fill="#FF3333" />
                                <Cell name="2018" fill="#B388FF" />
                                <Cell name="2017" fill="#6666FF" />
                                <Cell name="2016" fill="#99FF99" />
                                <Cell name="2015" fill="#66FF66" />
                                <Cell name="2014" fill="#99CC00" />
                                <Cell name="2013" fill="#009933" />
                            </Pie>
                            <Legend
                                iconType="circle"
                                layout="vertical"
                                verticalAlign="middle"
                                align="right"
                            />
                        </PieChart>
                    </ResponsiveContainer>}
                    <div id="pivotTableFirst" class="pivotTable">
                        <p class="pivotEle">Pivot Table</p>
                        <button type="button" id="barBtn" onClick={this.onClickBar} class="pivotEle">Bar Chart</button>
                        <button type="button" id="pieBtn" onClick={this.onClickPie} class="pivotEle">Pie Chart</button>
                    </div>
                </div>
            </div>
        );
    }
};

export default PopulationData;