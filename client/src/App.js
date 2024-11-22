import React, { Component } from 'react';
import './App.css';
import Customer from './Components/Customer';
import CustomerAdd from './Components/CustomerAdd';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    display: 'flex',
    justifyContent: 'center',
  },
  table: {
    maxWidth: 1080,
    minWidth: 1080,
  },
  tableHead: {
    backgroundColor: '#16423C',
    color: '#E9EFEC',
    fontWeight: 'bold'
  },
  tableRow1: {
    backgroundColor: '#6A9C89',

  },
  tableRow2: {
    backgroundColor: '#C4DAD2',

  },
  progress: {
    margin: theme.spacing(2)
  }
});

const colProperties = [
  "번호", "이미지", "이름", "생년월일", "성별", "직업","설정"
]

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
    }
  }

  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0
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

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;

    this.setState({ completed: completed >= 100 ? 0 : completed + 1 })
  }


  render() {
    const { classes } = this.props; // props에서 classes 추출
    return (
      <>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {
                  colProperties.map(col => {
                    return <TableCell className={classes.tableHead}>{col}</TableCell>
                  })
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers ?
                this.state.customers.map(
                  (customer, index) => {
                    let className = (index % 2 === 0) ? classes.tableRow2 : classes.tableRow1;
                    return (
                      <Customer stateRefresh={this.stateRefresh} className={className} key={customer.key} id={customer.id} name={customer.name} image={customer.image} birthday={customer.birthday} gender={customer.gender} job={customer.job} />
                    );
                  }
                )
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
        <CustomerAdd stateRefresh={this.stateRefresh} />

      </>

    );
  }
}

export default withStyles(styles)(App);
