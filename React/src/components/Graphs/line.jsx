import React, { Component } from "react";
import { Bar, Line, Pie, Doughnut, Radar, Polar } from "react-chartjs-2";

class Lines extends Component {
  state = {
    Data: {
      labels: this.props.data.labels,
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgba(179,181,198,0.2)",
          borderColor: "rgba(179,181,198,1)",
          pointBackgroundColor: "rgba(179,181,198,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(179,181,198,1)",
          data: this.props.data.values
        }
      ]
    },
    name: this.props.name
  };

  render() {
    return (
      <div className="chart">
        <Line
          data={this.state.Data}
          options={{
            title: {
              display: "Day label",
              text: this.state.name,
              fontSize: 25
            },
            legend: {
              display: " this.props.displayLegend",
              position: "this.props.legendPosition"
            }
          }}
        />
        {/*
        <Bar
          data={this.state.Data}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            width: "10",
            height: "10",
            title: {
              display: "Day label",
              text: this.state.name,
              fontSize: 25
            },
            legend: {
              display: "this.props.displayLegend",
              position: "this.props.legendPosition"
            }
          }}
        />*/}
      </div>
    );
  }
}

export default Lines;
