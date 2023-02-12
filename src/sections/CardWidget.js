/** @module CardWidget **/
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Box, Card, Typography } from '@mui/material';
import palette from '../theme/palette';

CardWidget.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const RootStyle = styled(Card)(() => ({
  textAlign: 'center',
  backgroundColor: palette.card,
}));

/**
 * Card that displays statistics.
 * @param {object} name - the name of the card
 * @param {object} value - the value of the card
 * @param {object} subtitle - the subtitle of the card
 */
function CardWidget({ name, value, subtitle }) {
  return (
    <RootStyle sx={{ marginTop: '4rem', boxShadow: 4 }}>
      <Card sx={{ display: 'flex', alignItems: 'center', p: 3, backgroundColor: "#ffffff" }}>
        <Box sx={{ flexGrow: 1, marginLeft: '1em' }}>
          <Typography align="left" variant="h6" >{name}</Typography>
          <Typography align="left" variant="subtitle2" >{subtitle}</Typography>
        </Box>
        <Typography align="right" variant="h3">{value}</Typography>
      </Card>
    </RootStyle>
  );
}

export default CardWidget;
