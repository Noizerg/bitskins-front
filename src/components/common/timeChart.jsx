import ApexCharts from 'apexcharts';
import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import { getRawPriceData } from '../../services/getItems';
import { ToastContainer, toast } from 'react-toastify';
class ApexChart extends React.Component {
  constructor(props) {
    super(props);
    console.log('data_chart', props.data);
    this.state = {
      series: [
        {
          data: props.data,
        },
      ],
      options: {
        chart: {
          id: 'area-datetime',
          type: 'area',
          height: 350,
          zoom: {
            autoScaleYaxis: true,
          },
        },
        annotations: {
          yaxis: [
            {
              y: 30,
              borderColor: '#999',
              label: {
                show: true,
                text: 'Support',
                style: {
                  color: '#fff',
                  background: '#00E396',
                },
              },
            },
          ],
          xaxis: [
            {
              x: new Date('01 Jan 2021').getTime(),
              borderColor: '#999',
              yAxisIndex: 0,
              label: {
                show: true,
                text: 'Rally',
                style: {
                  color: '#fff',
                  background: '#775DD0',
                },
              },
            },
          ],
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
          style: 'hollow',
        },
        xaxis: {
          type: 'datetime',
          min: new Date('01 Jan 2021').getTime(),
          tickAmount: 6,
        },
        tooltip: {
          x: {
            format: 'dd MMM yyyy',
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100],
          },
        },
      },

      selection: 'one_year',
    };
  }

  updateData(timeline) {
    this.setState({
      selection: timeline,
    });

    switch (timeline) {
      case 'one_month':
        ApexCharts.exec(
          'area-datetime',
          'zoomX',
          new Date('01 Jun 2021').getTime(),
          new Date('31 Jun 2021').getTime()
        );
        break;
      case 'six_months':
        ApexCharts.exec(
          'area-datetime',
          'zoomX',
          new Date('01 Jan 2021').getTime(),
          new Date('31 Dec 2021').getTime()
        );
        break;
      case 'one_year':
        ApexCharts.exec(
          'area-datetime',
          'zoomX',
          new Date('01 Jan 2021').getTime(),
          new Date('31 Dec 2021').getTime()
        );
        break;
      case 'ytd':
        ApexCharts.exec(
          'area-datetime',
          'zoomX',
          new Date('01 Jan 2021').getTime(),
          new Date('31 Dec 2021').getTime()
        );
        break;
      case 'all':
        ApexCharts.exec(
          'area-datetime',
          'zoomX',
          new Date('01 Jan 2018').getTime(),
          new Date('31 Dec 2021').getTime()
        );
        break;
      default:
    }
  }

  render() {
    return (
      <div id="chart">
        <h5>Steam Prices</h5>
        <div class="toolbar">
          <button
            id="one_month"
            onClick={() => this.updateData('one_month')}
            className={this.state.selection === 'one_month' ? 'active' : ''}
          >
            1M
          </button>
          &nbsp;
          <button
            id="six_months"
            onClick={() => this.updateData('six_months')}
            className={this.state.selection === 'six_months' ? 'active' : ''}
          >
            6M
          </button>
          &nbsp;
          <button
            id="one_year"
            onClick={() => this.updateData('one_year')}
            className={this.state.selection === 'one_year' ? 'active' : ''}
          >
            1Y
          </button>
          &nbsp;
          <button
            id="ytd"
            onClick={() => this.updateData('ytd')}
            className={this.state.selection === 'ytd' ? 'active' : ''}
          >
            YTD
          </button>
          &nbsp;
          <button
            id="all"
            onClick={() => this.updateData('all')}
            className={this.state.selection === 'all' ? 'active' : ''}
          >
            ALL
          </button>
        </div>

        <div id="chart-timeline">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    );
  }
}
export default ApexChart;
