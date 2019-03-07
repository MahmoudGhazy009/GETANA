import React, { Component } from "react";
import { Bubble } from "react-chartjs-2";

class Bubbless extends Component {
  constructor() {
    super();
    this.state = {
      chartData: {}
    };
  }
  componentWillMount() {
    this.getChartData();
  }

  getChartData() {
    // Ajax calls here
    this.setState({
      chartData: {
        labels: [
          "January",
          "Worcester",
          "Springfield",
          "Lowell",
          "Cambridge",
          "New Bedford"
        ],
        datasets: [
          {
            label: "My First dataset",

            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",

            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [
              { x: 10, y: 210, r: 5 },
              { x: 250, y: 2, r: 5 },
              { x: 10, y: 20, r: 5 },
              { x: 15, y: 2, r: 9 },
              { x: 70, y: 2, r: 8 },
              { x: 5, y: 200, r: 7 },
              { x: 120, y: 80, r: 7 },
              { x: 80, y: 120, r: 7 },
              { x: 0, y: 0, r: 7 }
            ]
          }
        ]
      }
    });
  }
  render() {
    return (
      <div>
        <h2>Bubble Example</h2>
        <Bubble data={this.state.chartData} />
      </div>
    );
  }
}

export default Bubbless;
