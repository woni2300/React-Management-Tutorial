import React from 'react'
import { Button, CardHeader, TextField, Typography, withStyles } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar';

import Customer from './SubPage/Customer';
import CustomerAdd from './SubPage/CustomerAdd'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchIcon from '@material-ui/icons/Search';
import DescriptionIcon from '@material-ui/icons/Description';
import ExcelJS from "exceljs";
import { saveAs } from 'file-saver';
import { Radio, RadioGroup } from '@material-ui/core';

import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    minWidth: 1080,
  },
  card:{
    minWidth: 275,
    backgroundColor: "#F1F0E8"  
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
    justifyContent: 'left',
  },
  table: {
    minWidth: 1080,
    backgroundColor: "#F1F0E8"  
  },
  tableHead: {
    fontWeight: 'bold',
    backgroundColor:'#89A8B2'

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
    backgroundColor: '#E5E1DA', // 기본 hover 색상

    '&:hover': {
      backgroundColor: '#9694FF', // 기본 hover 색상

    }

  },
  searchTypography: {
    display:'flex',
    flexFlow : 'rows'
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
      userName : '',
      gender : '',
      job : '',
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


  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
}


  filteredComponents = (customer) => {
    const { classes } = this.props;


    // 필터링 조건을 추가
    customer = customer.filter((c) => {
      return (
        (this.state.userName === '' || c.name.indexOf(this.state.userName) > -1) &&
        (this.state.gender === '' || c.gender.indexOf(this.state.gender) > -1) &&
        (this.state.job === '' || c.job.indexOf(this.state.job) > -1)
      );
    });

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

  handleExcelPrintClick = async () => {

    let  customer = this.state.customers;
    // 필터링 조건을 추가
    customer = customer.filter((c) => {
      return (
        (this.state.userName === '' || c.name.indexOf(this.state.userName) > -1) &&
        (this.state.gender === '' || c.gender.indexOf(this.state.gender) > -1) &&
        (this.state.job === '' || c.job.indexOf(this.state.job) > -1)
      );
    });


    const now = new Date();
    const formattedDate = `${now.getFullYear()}${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}`;
    const formattedTime = `${now.getHours().toString().padStart(2, "0")}${now.getMinutes()
      .toString()
      .padStart(2, "0")}${now.getSeconds().toString().padStart(2, "0")}`;
    const fileName = `customers_${formattedDate}${formattedTime}.xlsx`;

    if(!customer|| customer.length === 0) {
      alert("내용이 존재하지 않습니다.");
      return;
    }
    const data = customer.map((m, index) => {
      return {
        "No.": index + 1,
        ID: m.id,
        이름: m.name,
        생년월일: m.birthday,
        성별: m.gender,
        직업: m.job,
      };
    });
  
    
    // 엑셀 생성 로직
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");
  
    // 헤더 설정
    const headerKeys = Object.keys(data[0]);
    worksheet.addRow(headerKeys);
  
    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF4CAF50" }, // 녹색 배경
      };
      cell.font = { bold: true, color: { argb: "FFFFFFFF" } }; // 흰색 텍스트
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      }; // 테두리 설정
    });
  
    // 데이터 추가
    data.forEach((dataRow) => {
      worksheet.addRow(Object.values(dataRow));
    });

    // 테두리 스타일 설정
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

  
    // 열 너비 조정
    worksheet.columns = headerKeys.map((key, index) => {
      const maxLength = Math.max(
        key.length, // 헤더의 길이
        ...data.map((row) =>
          row[key] ? row[key].toString().length +2 : 0 // 데이터의 길이
        )
      );
      return { width: maxLength + 2 }; // 여유 공간 추가
    });
  
    // 엑셀 파일 다운로드
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, fileName);
  };

  render() {
    const { classes } = this.props; // props에서 classes 추출
    const colProperties = [
      "번호", "이미지", "이름", "생년월일", "성별", "직업", "설정"
    ]
    const { isDrawer } = this.state;




    return (
      <Paper className={isDrawer ? classes.contentShift : classes.content} >
        <Typography variant="h5">고객관리</Typography>
        <Card className={classes.card}>
          <CardHeader title={'검색'} />
          <CardContent className={classes.cardContent} >
            <Typography className={classes.searchTypography} >
              <TextField
                label='이름'
                type='text'
                name="userName"
                value={this.state.userName}
                onChange={this.handleValueChange}
              />
              &nbsp;
              &nbsp;
              &nbsp;
              <div>성별
                <RadioGroup name="gender" label='성별' defaultValue={""} title='성별' onChange={this.handleValueChange} >
                  <div className={classes.radioGroup}>
                    <Radio i label="-" title='-' value={''}></Radio>-
                    <Radio i label="남" title='남' value={'남'}></Radio>남
                    <Radio label="여" title='여' value={'여'}></Radio>여
                  </div>
                </RadioGroup>
              </div>

              &nbsp;
              &nbsp;
              &nbsp;
              <TextField
                label='직업'
                type='text'
                name="job"
                value={this.state.job}
                onChange={this.handleValueChange}
              />
            </Typography>
       
      
          </CardContent>
        </Card>
        <div className={classes.menu} >
          <ButtonGroup >
            <CustomerAdd stateRefresh={this.stateRefresh} />      
            <Button variant="contained" color="primary" onClick={this.handleExcelPrintClick} startIcon={<DescriptionIcon />} >Excel</Button>
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