import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
let chartData = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
        "rgba(255, 159, 64, 0.6)",
        "rgba(255, 99, 132, 0.6)"
      ]
    }
  ]
};
class Doughnutt extends Component {
  render() {
    let { data } = this.props;
    Object.entries(data).map(([key, value]) => {
      chartData.labels.push(key);
      chartData.datasets[0].data.push(value);
    });
    return (
      <div className="chart">
        <Doughnut data={chartData} />
      </div>
    );
  }
}

export default Doughnutt;
