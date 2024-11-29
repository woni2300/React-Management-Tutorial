import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';


import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Link } from 'react-router-dom';
import { alpha, withStyles } from '@material-ui/core/styles';

const drawerWidth = 240;


const styles = theme => ({
  root: {
    width: '100%',
    minWidth: 1080,
  },

  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center',
  },
  table: {
    minWidth: 1080,
  },
  tableHead: {
    fontWeight: 'bold'
  },

  progress: {
    margin: theme.spacing(2)
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  title: {
    flexGrow: 2,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },

  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    marginTop: theme.spacing(9),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  tableRow1: {
    '&:hover': {
      backgroundColor: '#9694FF', // 기본 hover 색상

    }

  },

  tableRow2: {
    '&:hover': {
      backgroundColor: '#9694FF', // 기본 hover 색상

    }

  },
  home: {
    color: "white",
    textDecorationLine: 'none',
    '&:hover': {        
      textDecoration : 'underline'
    }

  }



  /////////////////끝////////////////////////////////
});

class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      completed: 0,
      searchKeyword: '',
      isDrawer: false,
      isInfo: false,
      selectCustomer: {},
    };
  }


  handleDrawerOpen = () => {
    this.setState({ isDrawer: true });
  };

  handleDrawerClose = () => {
    this.setState({ isDrawer: false });
  };



  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
  }

  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0,
      searchKeyword: '',
      isDrawer: false,
    })
    this.callApi().then(res => {
      this.setState({ customers: res })
    }).catch((err) => console.log(err));
  }


  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
    if (this.props.handleValueChange) this.props.handleValueChange({ name: e.target.name, value: e.target.value });
  }

  handleHeaderMenuClick = (e)=>{
    if(this.props.handleHeaderMenuClick){
      this.props.handleHeaderMenuClick(e);
    }
  }

  render() {
    const { classes } = this.props; // props에서 classes 추출
    const { isDrawer } = this.state;
    return (
      <>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={isDrawer ? classes.appBarShift : classes.appBar}

        >
          <Toolbar>
            <IconButton
              edge="start"

              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={isDrawer ? classes.hide : classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              <Link className={classes.home} to="/">HOME</Link> 
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="검색하기..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                name="searchKeyword"
                value={this.state.searchKeyword}
                onChange={this.handleValueChange}
              />
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={isDrawer}
          classes={{
            paper: classes.drawerPaper,
          }}

        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose} >
              {/* {this.props.theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />} */}
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {[{text: '고객관리',link:'/client'}].map((menu, index) => (
              <ListItem button key={menu.text} component={Link} to="/customer"  >                
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={menu.text}  />
              </ListItem>
            ))}
          </List>

        </Drawer>
      </>
    )
  }
}
export default withStyles(styles)(HeaderComponent);
