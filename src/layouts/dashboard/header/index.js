import {
  // alpha,
  styled
} from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Grid, } from '@mui/material';


import { createStyles, makeStyles } from "@material-ui/core/styles";
import logo from "../../../logo.svg";

const BG_COLOR = '#FFFFFF';

const HEIGHT = 92;

// const RootStyle = styled(AppBar)(({ theme }) => ({
//   boxShadow: 'none',
//   backdropFilter: 'blur(6px)',
//   WebkitBackdropFilter: 'blur(6px)',
//   backgroundColor: alpha(theme.palette.background, 0.72),
//   width: `calc(100%}px)`
// }));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: HEIGHT,
  padding: theme.spacing(0, 5)
}));

const TextTypography = styled(Typography)(({ theme }) => ({
  color: "#000000",
  fontSize: theme.typography.h3.fontSize,
  fontWeight: theme.typography.h3.fontWeight,
  lineHeight: theme.typography.h3.lineHeight,
}));

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
      textAlign: "center"
    },
    logo: {
      maxWidth: 30,
      marginRight: '10px'
    }
  })
);

export default function DashboardNavbar() {
  const classes = useStyles();

  return (
    <AppBar
      sx={{ bgcolor: BG_COLOR }}
    >
      <ToolbarStyle
        disableGutters
        sx={{
          marginRight: 'auto',
          marginLeft: 'auto',
          width: { xl: '97rem', lg: '76rem' },
          height: '5rem'
        }}
      >
        <Grid container>
          <Grid item xs={12} md={0} />
          <img src={logo} alt="" className={classes.logo} />
          <TextTypography>ICPulse</TextTypography>
        </Grid>

      </ToolbarStyle>
    </AppBar>
  );
}
