import React, { Component } from 'react';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import HeaderComponent from '../../client/src/Components/Layout/HeaderComponent'
import MainComponent from './Components/Layout/MainComponent';
import {BrowserRouter} from 'react-router-dom';



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
      addTabs: [],
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


  render() {

    const { classes } = this.props; // props에서 classes 추출


    return (
      <BrowserRouter>
        <div className={classes.root}>
          <header>
            <HeaderComponent handleValueChange={this.handleValueChange} handleHeaderMenuClick={this.handleHeaderMenuClick} ></HeaderComponent>
          </header>
          <main>
            <MainComponent searchKeyword={this.state.searchKeyword} menuId={this.state.menuId} addTabs={this.state.addTabs} ></MainComponent>
          </main>
        </div>
      </BrowserRouter>


    );
  }
}

export default withStyles(styles)(App);
