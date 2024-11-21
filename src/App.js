import React, { Component } from 'react';
import './App.css';
import Customer from './Components/Customer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 1080,
  },
});

const colProperties = [
  "번호","이미지","이름","생년월일","성별","직업"
]


const customers = [
  {
    id: '1',
    image: 'https://dummyimage.com/64/555555/ffffff',
    name: '홍길동',
    birthDay: '961222',
    gender: '남',
    job: '대학생',
  },
  {
    id: '2',
    image: 'https://dummyimage.com/64/777777/ffffff',
    name: '홍길동1',
    birthDay: '961223',
    gender: '남',
    job: '대학생',
  },
  {
    id: '3',
    image: 'https://dummyimage.com/64/111111/ffffff',
    name: '홍길동2',
    birthDay: '961224',
    gender: '남',
    job: '대학생',
  },
];

class App extends Component {
  render() {
    const { classes } = this.props; // props에서 classes 추출
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {
                colProperties.map(col=>{
                  return <TableCell>{col}</TableCell>
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map(customer => (
              <Customer
                
                id={customer.id}
                name={customer.name}
                image={customer.image}
                birthDay={customer.birthDay}
                gender={customer.gender}
                job={customer.job}
              />
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
