/** @module RecentCommits **/
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { fToNow } from '../utils/format';
import { Box, Stack, Card, Typography, CardHeader, Link } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Client } from '../utils/client';

CommitItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    postedAt: PropTypes.instanceOf(Date),
    title: PropTypes.string
  })
};


function CommitItem({ item }) {
  const { dev_name, repo, organisation, commit_hash, commit_date, avatar_url, message } = item;

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{
        height: '5rem',
        "&:hover": {
          backgroundColor: alpha('#919EAB', 0.2)
        },
      }}
    >
      <Box component="img" src={avatar_url} sx={{ width: 30, height: 30, borderRadius: 1.5, marginLeft: '0.75rem' }} />

      <Box sx={{ minWidth: 240 }}>
        <Typography variant="body2" sx={{ color: 'text.primary', width: '65em' }} noWrap>
          {message.indexOf('\n') > 0 ? message?.substring(0, message.indexOf('\n')) : message}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1} justify="space-between">
          <Typography variant="subtitle2" noWrap>
            <Link
              target="_blank"
              color="inherit"
              rel="noopener"
              href={"https://github.com/" + dev_name}
            >
              {dev_name}
            </Link>
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            .
          </Typography>
          <Typography variant="subtitle2" noWrap>
            <Link
              target="_blank"
              color="inherit"
              rel="noopener"
              href={"https://github.com/" + organisation + "/" + repo}
            >
              {organisation}/{repo}
            </Link>
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            .
          </Typography>
          <Typography variant="subtitle2" noWrap>
            <Link
              target="_blank"
              color="inherit"
              rel="noopener"
              href={"https://github.com/" + organisation + "/" + repo + "/commit/" + commit_hash}
            >
              {commit_hash?.substring(0, 7)}
            </Link>
          </Typography>
        </Stack>
      </Box>

      <Box flexGrow={2}></Box>
      <Typography variant="caption" align="right" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {fToNow(commit_date)}
      </Typography>
    </Stack>
  );
}

/**
 * List of recent commits.
 */
function RecentCommits() {
  const [recentCommits, setRecentCommits] = useState([]);

  useEffect(() => {
    let isMounted = true;
    let client = new Client();

    let interval = setInterval(() => {
      client.get('recent_commits').then((recent_commits) => {
        if (isMounted) {
          setRecentCommits(recent_commits);
        }
      }).catch(() => { });
    }, 15 * 60 * 1000);

    client.get('recent_commits').then((recent_commits) => {
      if (isMounted) {
        setRecentCommits(recent_commits);
      }
    }).catch(() => { });

    return function cleanup() {
      isMounted = false;
      clearInterval(interval);
    };
  }, [setRecentCommits]);

  return (
    <Card sx={{ marginTop: '3rem', boxShadow: 4 }}>
      <CardHeader title="Recent commits" />
      <Box
        sx={{
          mb: 2,
          display: "flex",
          flexDirection: "column",
          height: '50em',
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
        <Stack sx={{ p: 3, pr: 0 }}>
          {recentCommits?.map((item) => (
            <CommitItem key={item.commit_hash} item={item} />
          ))}
        </Stack>
      </Box>
    </Card>

  );
}

export default RecentCommits;