import React, { Component } from 'react';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import HeaderComponent from '../../client/src/Components/Layout/HeaderComponent'
import MainComponent from './Components/Layout/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import PageCustomer from './Components/Customer/PageCustomer';


const styles = theme => ({
  root: {
    width: '100%',
    minWidth: 1080,
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
      searchKeyword: '',
      menuId: '',
      tabs: [
        {
          label: "고객 관리",
          path: "/customer",
          component: <PageCustomer/>,
          state: { data: "Customer Data" } // 각 탭 별로 상태를 관리
        },
      ],
      selectedTabIndex: 0,
    }
  }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.name] = e.value;
    this.setState(nextState);
  }

  handleHeaderMenuClick = (e) => {
    const addTabs = this.state.addTabs;

    const count = this.state.addTabs.length;
    addTabs.push(count);
    this.setState({ menuId: e.menuId, addTabs: addTabs })
  }


  addTab = () => {
    if (this.state.tabs.length >= 9) {
      return;
    }

    const newTab = {
      label: `Tab ${this.state.tabs.length + 1}`,
      path: `/`,
      component: <div>New Tab Content {this.state.tabs.length + 1}</div>,
      state: { data: `Tab ${this.state.tabs.length + 1} Data` }, // 새 탭에 대한 독립적인 상태
    };

    this.setState(prevState => ({
      tabs: [...prevState.tabs, newTab],
      selectedTabIndex: prevState.tabs.length,  // 새로 추가된 탭으로 이동
    }));
  };

  handleTabChange = (event, newIndex) => {
    console.log(this.state.tabs[newIndex])
    this.setState({ selectedTabIndex: newIndex });
  };

  render() {

    const { classes } = this.props; // props에서 classes 추출


    return (
      <BrowserRouter>
        <div className={classes.root}>
          <header>
            <HeaderComponent handleValueChange={this.handleValueChange} handleHeaderMenuClick={this.handleHeaderMenuClick} ></HeaderComponent>
          </header>
          <main>
            <MainComponent 
              menuId={this.state.menuId}
              tabs={this.state.tabs}
              selectedTabIndex={this.state.selectedTabIndex}
              onTabChange={this.handleTabChange}
              onAddTab={this.addTab}
            ></MainComponent>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default withStyles(styles)(App);
