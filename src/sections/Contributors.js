/** @module Issues **/
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
import { number } from '../utils/format';
import { CustomChart } from '../components/chart';
import { useState, useEffect } from 'react';

import { Client } from '../utils/client';

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(2),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));

/**
 * Pie chart that displays the number of issues.
 */
function Contributors() {
  const [state, setState] = useState({ loading: true, chartData: [0, 0] });

  useEffect(() => {
    const client = new Client();
    client.get('statistics').then((statistics) => {
      let new_contributors = parseInt((statistics?.new_contributors) ? statistics?.new_contributors : 0);
      let active_contributors = parseInt((statistics?.active_contributors) ? statistics?.active_contributors : 0);

      setState({ loading: false, chartData: [new_contributors, active_contributors] });
    });
  }, [setState]);

  const chartOptions = merge(CustomChart(), {
    colors: [
      "#F2C1B0",
      "#F15A24",
    ],
    chart: {
      width: 500
    },
    labels: ['New', 'Active'],
    stroke: {
      colors: ['#FFFFFF'],
      width: 10,
    },
    legend: { floating: true, horizontalAlign: 'center' },
    tooltip: {
      fillSeriesColor: true,
      y: {
        formatter: (seriesName) => number(seriesName),
        title: {
          formatter: (seriesName) => `${seriesName}`
        }
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '85%',
          labels: {
            value: {
              formatter: (val) => number(val)
            },
            total: {
              formatter: (w) => {
                const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                return number(sum);
              }
            }
          }
        }
      }
    },
  });

  return (
    <Card sx={{ marginTop: '3rem', boxShadow: 4 }}>
      <CardHeader title="Contributors (30d)" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="donut" series={state.chartData} options={chartOptions} height={310} />
      </ChartWrapperStyle>
    </Card>
  );
}

export default Contributors;