import React from 'react';
//redux
import { bindActionCreators } from 'redux'
import { login, logout } from '../redux/userActions'
import { connect } from 'react-redux'
//css - material
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withTheme } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import theme from '../themefile'
//semantic -
import { Button } from 'semantic-ui-react';
//--
//import  '../pomo.png'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
	bigAvatar: {
    width: 60,
    height: 60,
    border: '2px solid #ff6659;'
  }
});

class TitleBar extends React.Component {

	handleLogin = () => this.props.user.loggedIn ? this.props.logout() : this.props.login()

  countToLength = () => {
    let arr = [];
    for (let i = 0; i < this.props.user.pomoCount; i ++ ) {
      arr.push(i)
    }
    return arr
  }

  render() {
    const { classes } = this.props;
    const { palette } = theme;
    const { primary, secondary } = palette


    return (
      <div className={classes.root}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={this.props.user.loggedIn} aria-label="LoginSwitch" />
            }
            label={this.props.user.loggedIn ? 'Logout' : 'Login'} onClick={() => this.handleLogin()}
          />
        </FormGroup>
        <AppBar position="static">
          <Toolbar >
            <IconButton className={classes.menuButton}  aria-label="Menu">
            <Avatar
              src='/images/pomodoro.png'
              className={classes.smallAvatar}
            />
            </IconButton>
            <Typography variant="title"  className={classes.grow}>
              getPOMOS
            </Typography>
            <div> {this.props.user.pomoCount !== 0 ? this.countToLength().map( (pomo) => {
              return (
                <img src='/images/pomo.png' />
              )
            }) : null } </div>
            {this.props.user.loggedIn && (
              <div>

                <Badge id='badge' badgeContent={this.props.user.pomoCount} color='secondary'>
                  <Avatar
                    src={this.props.user.info.photoURL}
                    className={classes.bigAvatar}
                  />
                </Badge>

              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

TitleBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => state

const mapDispatchToProps = (dispatch) => bindActionCreators({login, logout}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TitleBar));

	//onLeftIconButtonTouchTap={props.onLeftIconButtonTouchTap}
