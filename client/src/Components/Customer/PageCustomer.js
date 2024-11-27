import React from 'react'
import { Button, TextField, withStyles } from '@material-ui/core'

import Customer from './../Customer/Customer';
import CustomerAdd from '../Customer/CustomerAdd'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchIcon from '@material-ui/icons/Search';


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
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    paddingRight: 5
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

  }



  /////////////////끝////////////////////////////////
});



class PageCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      completed: 0,
      searchKeyword: this.props.searchKeyword ?? '',
      isDrawer: false,
      isInfo: false,
      selectCustomer: {},
    }
  }



  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;

    this.setState({ completed: completed >= 100 ? 0 : completed + 1 })
  }
  componentDidUpdate() {
    if (this.props.searchKeyword && this.props.searchKeyword !== this.state.searchKeyword) {
      this.setState({ searchKeyword: this.props.searchKeyword });
    }
  }
  componentDidMount() {
    this.timer = setInterval(this.progress, 20);


    this.callApi().then(res => {
      this.setState({ customers: res })
    }).catch((err) => console.log(err));
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



  filteredComponents = (customer) => {
    const { classes } = this.props;

    customer = customer.filter((c) => {
      return c.name.indexOf(this.state.searchKeyword) > -1;
    })

    return customer.map((customer, index) => {
      let className = "";
      className = (index % 2 === 0) ? classes.tableRow1 : classes.tableRow2;
      return (
        <Customer
          key={index}
          stateRefresh={this.stateRefresh}
          className={className}
          data={customer}
        />
      )
    })


  }

  render() {
    const { classes } = this.props; // props에서 classes 추출
    const colProperties = [
      "번호", "이미지", "이름", "생년월일", "성별", "직업", "설정"
    ]
    const { isDrawer } = this.state;




    return (
      <Paper className={isDrawer ? classes.contentShift : classes.content} >
        <Paper>
          
          <TextField
            label='이름'
            type='text'
            name="userName"
            value={this.state.userName}
            onChange={this.handleValueChange} 
            
            />
        </Paper>


        <div className={classes.menu} >
          <ButtonGroup>
            <Button variant="contained" color='primary' startIcon={<SearchIcon></SearchIcon>}>Search</Button>
            <CustomerAdd stateRefresh={this.stateRefresh} />
          </ButtonGroup>
        </div>
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
              this.filteredComponents(this.state.customers, classes.tableRow1)
              : <TableRow>
                <TableCell>
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </Paper>

    )
  }
}

export default withStyles(styles)(PageCustomer);