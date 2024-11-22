import React, { Component } from 'react';
import clsx from 'clsx';
import './App.css';
import Customer from './Components/Customer';
import CustomerAdd from './Components/Customer/CustomerAdd';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { alpha, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import fade from '@material-ui/core/styles/colorManipulator';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';


import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';



const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    minWidth:1080,
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

  paper:{
    marginLeft:18,
    marginRight:18
  },
  menu:{
    marginTop:15,
    marginBottom:15,
    display:'flex',
    justifyContent:'center',
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
    flexGrow: 1,
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
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  /////////////////끝////////////////////////////////
});


/**
 * 1) constructor ()
 * 2) componentWillMount()
 * 3) render()
 * 4) componentMount()
 * 
 * props or state = > shouldComponentUpdate
 */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      completed: 0,
      searchKeyword:'',
      isDrawer : false,
    }
  }

  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0,
      searchKeyword:'',
      isDrawer:false,
    })
    this.callApi().then(res => {
      this.setState({ customers: res })
    }).catch((err) => console.log(err));
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);


    this.callApi().then(res => {
      this.setState({ customers: res })
    }).catch((err) => console.log(err));
  }

  handleDrawerOpen = () => {
    this.setState({ isDrawer: true });
  };

  handleDrawerClose = () => {
    this.setState({ isDrawer: false });
  };


  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;

    this.setState({ completed: completed >= 100 ? 0 : completed + 1 })
  }

  handleValueChange = (e)=>{
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);

  }
  filteredComponents = (customer) => {
    const {classes} = this.props;

    customer = customer.filter((c)=>{
      return c.name.indexOf(this.state.searchKeyword) > -1;
    })

    return customer.map((customer,index)=>{
      let className = "";
      className = (index % 2 === 0) ? classes.tableRow1 : classes.tableRow2;      
      return <Customer stateRefresh={this.stateRefresh} className={className} key={customer.key} id={customer.id} name={customer.name} image={customer.image} birthday={customer.birthday} gender={customer.gender} job={customer.job} />
    })

  }

  render() {



    const { classes } = this.props; // props에서 classes 추출
    const colProperties = [
      "번호", "이미지", "이름", "생년월일", "성별", "직업", "설정"
    ]
    const { isDrawer } = this.state;
    
    return (
      <div className={classes.root}>
         <CssBaseline />
        <AppBar
           position="fixed"
          className={isDrawer ?  classes.appBarShift : classes.appBar }
        
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
              고객관리 시스템
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
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>


        <div className={classes.menu} >
          <CustomerAdd stateRefresh={this.stateRefresh} />

        </div>
        <Paper className={isDrawer ? classes.contentShift : classes.content} >
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {
                  colProperties.map(col => {
                    return <TableCell key={col} className={classes.tableHead}>{col}</TableCell>
                  })
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers ?
                this.filteredComponents(this.state.customers,classes.tableRow1)
                :

                <TableRow>
                  <TableCell>
                    <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
        

      </div>

    );
  }
}

export default withStyles(styles)(App);
