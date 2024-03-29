import { Helmet } from 'react-helmet-async';
import { forwardRef } from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

const Page = forwardRef(({ children, title = '', ...other }, ref) => {
  return (
    <Box ref={ref} {...other}>
      <Helmet>
        <title>ICPulse</title>
      </Helmet>
      {children}
    </Box>
  );
});

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Page;
