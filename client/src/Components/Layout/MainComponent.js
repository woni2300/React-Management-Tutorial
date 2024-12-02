import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Routes, Route, Navigate,Outlet } from 'react-router-dom';
import PageCustomer from '../Customer/PageCustomer';
import LoginPage from '../Login/LoginPage';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';




class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0, // 현재 선택된 탭
            tabs: [
                { label: "Customer", path: "/customer", component: <PageCustomer /> }, // 기본 탭
            ],
        };
    }

    handleChange = (event, newValue) => {
        this.setState({ value: newValue });
    };

    handleAddTab = () => {
        if (this.state.tabs.length >= 9) {
            return; // 9개 탭 이상은 추가되지 않도록 종료
        }

        // 새로운 탭을 추가하는 함수
        const newTab = {
            label: `Tab ${this.state.tabs.length + 1}`,  // 새로운 탭 이름
            path: `/tab-${this.state.tabs.length + 1}`, // 라우트 경로
            component: <Typography>New Tab Content {this.state.tabs.length + 1}</Typography>, // 탭에 해당하는 컴포넌트
        };

        // 탭을 추가하고, 새 탭으로 상태를 갱신
        this.setState(prevState => {
            const newTabs = [...prevState.tabs, newTab];
            return {
                tabs: newTabs,
                value: newTabs.length - 1, // 새로 추가된 탭으로 이동
            };
        });
    };

    isAuthenticated = () => {
        // 인증 체크 예시
        return localStorage.getItem('authToken') !== null;
    };

    render() {
        const { classes, tabs, selectedTabIndex, onTabChange, onAddTab  } = this.props;
        
  
        return (
            <div className={classes.root}>
                <div className={classes.content}>
                    <Routes>
                        {/* 인증되지 않은 경우 */}
                        {!this.isAuthenticated() && (
                            <Route path="*" element={<Navigate to="/login" replace />} />
                        )}
                        {/* 인증된 경우 */}
                        {this.isAuthenticated() && (
                            <Route element={<><Outlet></Outlet></>}>
                                <Route path="*" element={<Navigate to={"/home"} replace />} />
                                <Route path="/home" element={<></>} />
                                <Route path="/customer" element={<PageCustomer />} />
                            </Route>
                        )}
                        {/* 로그인 페이지 */}
                        <Route path="/login" element={<LoginPage />} />
                    </Routes>
                </div>
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: "#F3EDC8",
        marginTop: '3vh',
    },
    tabsWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tab: {
        borderRight: `1px solid ${theme.palette.divider}`,
        '&:last-child': {
            borderRight: 'none',
        },
    },
    addTabButton: {
        marginLeft: theme.spacing(1),
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
});

export default withStyles(styles)(MainComponent);
