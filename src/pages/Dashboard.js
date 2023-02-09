import { useTheme } from '@mui/material/styles';
import { Container, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import Page from '../components/Page';
import { Footer } from '../components/Footer';
import { Client } from '../utils/client';

import {
  RecentCommits,
  Commits,
  CardWidget,
  TopContributors,
  Issues,
  Ecosystem,
} from '../sections';

const client = new Client();

export default function Dashboard() {
  // const theme = useTheme();
  const themeStretch = false;

  const [state, setState] = useState({
    loading: true,
    commits: '',
    new_commits_last_week: '',
    new_commits_last_month: '',
    repositories: '',
    new_repos_last_week: '',
    new_repos_last_month: '',
    contributors: '',
    new_contributors_last_week: '',
    new_contributors_last_month: '',
    prs: '',
    new_prs_last_week: '',
    new_prs_last_month: ''
  });
  useEffect(() => {
    setState({ loading: true });

    client.get('statistics').then((statistics) => {
      setState({
        loading: false,
        commits: statistics.commits,
        new_commits_last_week: statistics.new_commits_last_week,
        new_commits_last_month: statistics.new_commits_last_month,
        repositories: statistics.repos,
        new_repos_last_week: statistics.new_repos_last_week,
        new_repos_last_month: statistics.new_repos_last_month,
        contributors: statistics.contributors,
        new_contributors_last_week: statistics.new_contributors_last_week,
        new_contributors_last_month: statistics.new_contributors_last_month,
        prs: statistics.prs,
        new_prs_last_week: statistics.new_prs_last_week,
        new_prs_last_month: statistics.new_prs_last_month,
      })

    });
  }, [setState]);

  return (
    <Page title="IcPulse">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <CardWidget
              name='Contributors'
              value={((state.contributors) ? (state.contributors) : ' ')}
              subtitle={((state.new_contributors_last_week > 0) ?
                ('+ ' + state.new_contributors_last_week) + ' than last week' :
                (state.new_contributors_last_month) ? ('+ ' + state.new_contributors_last_month) + ' then last month'
                  : ' ')}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <CardWidget
              name='Repositories'
              value={((state.repositories) ? (state.repositories) : ' ')}
              subtitle={((state.new_repos_last_week > 0) ?
                ('+ ' + state.new_repos_last_week) + ' than last week' :
                (state.new_repos_last_month) ? ('+ ' + state.new_repos_last_month) + ' then last month'
                  : ' ')}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <CardWidget
              name='Commits'
              value={((state.commits) ? (state.commits) : ' ')}
              subtitle={((state.new_commits_last_week > 0) ?
                ('+ ' + state.new_commits_last_week) + ' than last week' :
                (state.new_commits_last_month) ? ('+ ' + state.new_commits_last_month) + ' then last month'
                  : ' ')}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <CardWidget
              name='PRs'
              value={((state.prs) ? (state.prs) : ' ')}
              subtitle={((state.new_prs_last_week > 0) ?
                ('+ ' + state.new_prs_last_week) + ' than last week' :
                (state.new_prs_last_month) ? ('+ ' + state.new_prs_last_month) + ' then last month'
                  : ' ')}
            />
          </Grid>

          <Grid item xs={12} md={3} lg={4}>
            <TopContributors />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <Ecosystem />
          </Grid>

          <Grid item xs={12} md={3} lg={4}>
            <Issues />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <Commits />
          </Grid>

          <Grid item xs={12} lg={12}>
            <RecentCommits />
          </Grid>

        </Grid>
        <Footer />
      </Container>

    </Page>
  );
}
