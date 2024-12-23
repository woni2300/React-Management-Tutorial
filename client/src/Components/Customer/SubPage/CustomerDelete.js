import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class CustomerDelete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }
    

    deleteCustomer = (id) =>{
        const url = '/api/customers/' + id;
        fetch(url, {
            method : 'DELETE'
        });
        this.props.stateRefresh();
    }

    
    handleClickOpen = () => {
        this.setState({ open: true });
    }
    handleClickClose = () => {
        this.setState({open: false})
    }


    render(){
        return (
            <>
                
                <Button variant='contained' color='secondary' onClick={this.handleClickOpen}>삭제</Button>
                <Dialog open={this.state.open} onClose={this.handleClickClose}>
                    <DialogTitle>
                        삭제경고
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 고객 정보가 삭제됩니다.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' color='secondary' onClick={(e)=>{this.deleteCustomer(this.props.id)} }>삭제</Button>
                        <Button variant='outlined' color='secondary' onClick={this.handleClickClose} >취소</Button>
                    </DialogActions>
                </Dialog>


            </>
        )
    }
}


export default CustomerDelete