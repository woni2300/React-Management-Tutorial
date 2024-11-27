import React from 'react'

import { withStyles } from '@material-ui/core/styles';
import {  Routes, Route } from 'react-router-dom';
import PageCustomer from '../Customer/PageCustomer';

import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const drawerWidth = 240;


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }

  
const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        marginTop:'7vh',
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



class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: '',
            completed: 0,
            searchKeyword: this.props.searchKeyword,
            isDrawer: false,
            isInfo: false,
            selectCustomer: {},
            value: 0,
            menuId: '',
        }
    }

    handleChange = (event, newValue) => {
        this.setState({ value: newValue });
      };
    render() {
        const { classes } = this.props;
        const { value } = this.state;
    
        return (
            <>
                <div className={classes.root}>

                    
                            <Routes>
                                <Route path="/" element={<></>}></Route>
                                <Route path="/customer" element={<PageCustomer />} />
                            </Routes>
                
                </div>



            </>

        )
    }
}

export default withStyles(styles)(MainComponent)