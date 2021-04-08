import React, { useState } from 'react';
import Link from 'next/link';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import styles from '../styles/Navbar.module.css';
import { signIn, signOut, useSession } from 'next-auth/client';
import CreateEvent from '../pages/createEvent';
import { Button } from 'react-bootstrap';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const Navbar = ({ setSearch, userId, host }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [session, loading] = useSession();
  // const [search, setSearch] = useState();
  const [modalShow, setModalShow] = useState(false);

  const handleSearch = e => {
    setSearch(e.target.value);
  }

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.nav_cluster_left}>
        <EventAvailableIcon className={styles.logo} />
        <TextField
          className={styles.search}
          label="Search Events"
          variant="outlined"
          onChange={handleSearch}
        />
      </div>
      <div className={styles.nav_cluster_right}>
        {host
          ? <div className={styles.create} onClick={() => setModalShow(true)}>Create Event</div>
          : <React.Fragment></React.Fragment>
        }
        <CreateEvent show={modalShow} onHide={() => setModalShow(false) } userId={userId}/>
        <AccountCircleIcon className={styles.account} onClick={handleClick} />
        <StyledMenu
          className={styles.menu}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {/* link to profile view here  */}
          <MenuItem onClick={handleClose}>My Profile</MenuItem>
          {/* sign out functionality here  */}
          <MenuItem onClick={() => {handleClose(); signOut();}}>Sign Out</MenuItem>
        </StyledMenu>
      </div>
    </div>
  );
};

export default Navbar;
