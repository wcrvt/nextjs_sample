import PropTypes from 'prop-types';
import { AppBar, IconButton, Toolbar } from '@mui/material';

// Icon
import MenuIcon from '@mui/icons-material/Menu';


export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;

  return (
    <>
      <AppBar
        sx={{
          left: { lg: 250 },
          width: { lg: 'calc(100% - 250px)' },
          backgroundColor: '#fff',
          boxShadow: 1
        }}
        {...other}
      >

        <Toolbar
          disableGutters
          variant="dense"
          sx={{ left: 0, px: 2 }}
        >

          <IconButton
            onClick={onSidebarOpen}
            sx={{ display: { xs: 'inline-flex', lg: 'none' } }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          
        </Toolbar>

      </AppBar>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};
