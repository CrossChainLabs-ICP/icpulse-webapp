/** @module EcosystemChart **/
import merge from 'lodash/merge';
import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box } from '@mui/material';
import { CustomChart } from '../components/chart';
import { Client } from '../utils/client';

/**
 * Line chart that displays the number of active developers and active repositories for each month over the last year.
 */
function Ecosystem() {
  const [state, setState] = useState({
    loading: true,
    categories: [],
    data: [
      { name: 'Core', data: [] },
      { name: 'Community', data: [] }
    ]
  });

  useEffect(() => {
    const client = new Client();

    client.get('activity').then((response) => {
      let activity = response;
      activity.pop();

      if (activity.length > 12) {
        activity.splice(0, activity.length - 12);
      }
      let contributorsData = [];
      let reposData = [];
      let categories = [];

      activity.forEach(item => {
        contributorsData.push(item.active_contributors);
        reposData.push(item.active_repos);
        categories.push(item.display_month.slice(0, -3));
      });

      setState({
        loading: false,
        categories: categories,
        data: [
          { name: 'Core', data: contributorsData },
          { name: 'Community ', data: reposData }
        ]
      });
    });
  }, [setState]);

  const chartOptions = merge(CustomChart(), {
    xaxis: {
      categories: state.categories,
    },
    colors: ["#F15A24", "#F2C1B0"],
    stroke: {
      width: 2,
      colors: ["#F15A24", '#F2C1B0'],
    },
    markers: {
      colors: ["#F15A24", "#F2C1B0"],
      strokeColors: ["#F15A24", "#F2C1B0"],
    },
    grid: {
      borderColor: '#000000',
    },
    chart: {
      foreColor: '#000000',
    }
  });

  return (
    <Card sx={{ marginTop: '3rem', boxShadow: 4 }}>
      <CardHeader title="Active Repositories" />
      <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
        <ReactApexChart
          type="line"
          series={state.data}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
}

export default Ecosystem;

