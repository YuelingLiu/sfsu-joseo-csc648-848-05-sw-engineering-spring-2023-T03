import React, { useState } from 'react';

// MUI Components 
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';

// used like LINK
import { useHistory, Link } from 'react-router-dom'

// Drop down items
const NavChoicesLoggedIn = ['Categories', 'My Feed', 'Top Rated' ];
const NavChoicesLoggedOut = ['Categories', 'Top Rated' ];
const profileLoggedOut = ['Sign Up', 'Login'];
const profileLoggedIn = ['Profile', 'Following', 'Favorites', 'Logout'];

// for MUI 
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
    },
}));

// for MUI
const SearchIconWrapper = styled('div')(({ theme }) => ({
padding: theme.spacing(0, 2),
height: '100%',
position: 'absolute',
pointerEvents: 'none',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
}));

// for MUI
const StyledInputBase = styled(InputBase)(({ theme }) => ({
color: 'blackit',
'& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
    width: '20ch',
    },
},
})); 

function Navbar () {
    // for MUI
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    // used for search bar to go to icon on smaller screens
    const [screenSize, setScreenSize] = useState(true);
    // placement code until we have logged in working 
    const [loggedin, setLoggedIn] = useState(true);

    // for MUI
    const  handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    // for MUI
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    // for MUI
    const handleCloseNavMenu = (e) => {
        setAnchorElNav(null);

        let id = e.target.id;
        console.log(id);
    };
    // for MUI
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // take user to profile page with icon click in logged in
    let history = useHistory()
    const switchPage = (e) => {
        let id = e.target.id;
        console.log(id);
        history.push('/Profile')
    }

  return (
    <>
        {(screenSize) ? ( 
            <AppBar position="static" style={{ background: '#FFFFFF' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'serif',
                        fontWeight: 'bolder',
                        letterSpacing: '.3rem',
                        color: 'black',
                        textDecoration: 'none',
                        }}
                    >
                        RecipeReel
                    </Typography>
            
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="black"
                        >
                        <MenuIcon />
                        </IconButton>
                        <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                        >
                    
                        {(loggedin) ? (
                            <>
                                {NavChoicesLoggedIn.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Link to={`/${page}`}>
                                            <Typography textAlign="center">{page}</Typography>
                                        </Link>
                                    </MenuItem>
                                ))}
                            </>
                        ) : (
                            <>
                                 {NavChoicesLoggedOut.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Link to={`/${page}`}>
                                            <Typography textAlign="center">{page}</Typography>
                                        </Link>
                                    </MenuItem>
                                ))}
                            </>
                        )}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'serif',
                        fontWeight: 'bolder',
                        letterSpacing: '.3rem',
                        color: 'black',
                        textDecoration: 'none',
                        }}
                    >
                        RecipeReel
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                        {(loggedin) ? (
                            <>
                                {NavChoicesLoggedIn.map((page) => (
                                    <Button
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'black', display: 'block' }}
                                        id={page}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </>
                        ) : (
                            <>
                                {NavChoicesLoggedOut.map((page) => (
                                    <Button
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'black', display: 'block' }}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </>
                        )}
                    </Box>
                    

                    {/* Right side of nav */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Toolbar>
                            <Search>
                                <SearchIconWrapper>
                                <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Toolbar>
                        <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        >
                        {/* Later on for login */}
                        {(loggedin) ? (
                            <>
                                {profileLoggedIn.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </>
                        ) : (
                            <>
                                {profileLoggedOut.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </>
                        )}
                        </Menu>
                    </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        ) : (
           <>
           </>
        ) }
    </>
  );
}
export default Navbar;


