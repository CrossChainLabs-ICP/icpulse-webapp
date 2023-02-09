/** @module CommitsChart **/
import merge from 'lodash/merge';
import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box } from '@mui/material';
import { CustomChart } from '../components/chart';
import { Client } from '../utils/client';


/**
 * Bar chart that displays the number of commits for each month over the last year.
 */
function Commits() {
  const [state, setState] = useState({
    loading: true,
    categories: [],
    data: [
      { name: 'Core', data: [] },
      { name: 'Ecosystem ', data: [] }
    ]
  });

  useEffect(() => {
    const client = new Client();

    client.get('commits').then((response) => {
      let commits = response;
      commits.pop();
      if (commits.length > 12) {
        commits.splice(0, commits.length - 12);
      }

      let coreData = [];
      let ecosystemData = [];
      let categories = [];

      commits.forEach(item => {
        coreData.push(item.commits);
        ecosystemData.push(item.commits);
        categories.push(item.display_month);
      });

      setState({
        loading: false,
        categories: categories,
        data: [
          { name: 'Core', data: coreData },
          { name: 'Ecosystem', data: ecosystemData }
        ]
      });
    });
  }, [setState]);

  const chartOptions = merge(CustomChart(), {
    xaxis: {
      categories: state.categories,
      lables: {
        colors: ["#F15A24", "#F2C1B0"],
      },
    },
    colors: ["#F15A24", "#F2C1B0"],
    fill: {
      // colors: ["#F15A24", "#F2C1B0"],
      colors: ["#F2C1B0", "#F15A24"],
    },
    stroke: {
      width: 2,
      // colors: ["#F15A24", "#F2C1B0"],
      colors: ["#F2C1B0", "#F15A24"],
    },
    grid: {
      borderColor: '#000000',
    },
    chart: {
      foreColor: '#000000'
    },

  });

  return (
    <Card sx={{ marginTop: '3rem', boxShadow: 4 }}>
      <CardHeader
        title="Commits"
      />
      <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={state.data} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}

export default Commits;
