import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Typography, ListItem, useMediaQuery } from '@mui/material';

// Icons
import { ChartBar as ChartBarIcon } from 'src/icons/chart-bar';


const color = {
  category: '#e5e9ff',
  icon: { active: '#70e5ff', inactive: '#fff' },
  text: { active: '#70e5ff', inactive: '#fff' },
  bg: { selected: 'rgba(255,255,255, 0.0)', hover: 'rgba(255,255,255, 0.05)'}
};

const NavItem_item = (props) => {
  const { href, icon, title, ...others } = props;
  const router = useRouter();
  const active = href ? (router.pathname === href) : false;

  return (
    <ListItem disableGutters sx={{ display: 'flex', mb: 0.5, py: 0, px: 2 }} {...others}>
      <NextLink href={href} passHref >
        <Button
          component="a"
          startIcon={icon}
          disableRipple
          sx={{
            backgroundColor: active && color.bg.selected,
            borderRadius: 1,
            color: active ? color.text.active : color.text.inactive,
            fontWeight: active && 'fontWeightBold',
            justifyContent: 'flex-start',
            px: 3,
            textAlign: 'left',
            textTransform: 'none',
            width: '100%',
            '& .MuiButton-startIcon': {
              color: active ? color.icon.active : color.icon.inactive,
            },
            '&:hover': {
              backgroundColor: color.bg.hover,
            }
          }}
        >
          <Box sx={{ flexGrow: 1 }}> {title} </Box>
        </Button>
      </NextLink>
    </ListItem>
  );
};

NavItem_item.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string
};

const NavItem_category = (props) => {
  const { menu } = props;
  return (
    <>
      <Typography
        sx = {{
          pl: 3, pt: 0.2, pb: 0.5,
          fontWeight: 'bold',
          color: color.category
        }}
      >
        {menu.group}
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        {menu.item.map((item) => (
          <NavItem_item
            key={item.title}
            icon={item.icon}
            href={item.href}
            title={item.title}
          />
        ))}
      </Box>
    </>
  );
};

const NavItem = (props) => {
  const { menu } = props;
  return (
    <>
      {menu.map((item) => <NavItem_category key = {item.group} menu = {item} /> )}
    </>
  );
};

const menu = [
  {
    group: 'Control System',
    item: [
      {
        href: '/',
        icon: (<ChartBarIcon fontSize="small" />),
        title: 'Sample'
      },
    ]
  },
]

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  useEffect(
    () => {
      if (!router.isReady) return;
      if (open) onClose?.();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const bg_color = '#4180ff';
  const bd_color = '#efefef';
  const br = (<br />);
  const pageTitle = (<> Digital Servo {br} Control System </>);

  const content = (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

        <Box sx={{p: 2, pl: 4 }}>
            <Typography sx={{fontSize: 20, fontWeight: 'bold',}}> {pageTitle} </Typography>
        </Box>

        <Divider sx={{ borderColor: bd_color, mb: 2 }} />

        <Box sx={{ flexGrow: 1 }}>
          <NavItem menu = {menu} />
        </Box>

      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{ sx: { backgroundColor: bg_color, color: '#FFFFFF', width: 250 } }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { backgroundColor: bg_color, color: '#FFFFFF', width: 250 } }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
