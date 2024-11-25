import React from 'react';
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import CustomerDelete from './CustomerDelete';
import CustomerInfo from './CustomerInfo'
class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isInfo: false,
            selectCustomer: {}
        }
    }

    rowDoubleClick = (selectCustomer) => {
        this.setState({selectCustomer:selectCustomer, isInfo:true});
    }
    onClose = () => {
        this.setState({ selectCustomer: {}, isInfo: false });
    }

    render() {
        return (
            <>
                <TableRow className={this.props.className} onDoubleClick={() => this.rowDoubleClick({ id: this.props.id, image: this.props.image, userName: this.props.name, birthday: this.props.birthday, gender: this.props.gender, job: this.props.job, })}>
                    <TableCell>
                        <p>{this.props.id}</p>
                    </TableCell>
                    <TableCell>
                        <img width={64} height={64} src={this.props.image} alt='profile' ></img>
                    </TableCell>
                    <TableCell>
                        <p>{this.props.name}</p>
                    </TableCell>
                    <TableCell>
                        <p>{this.props.birthday}</p>
                    </TableCell>
                    <TableCell>
                        <p>{this.props.gender}</p>
                    </TableCell>
                    <TableCell>
                        <p>{this.props.job}</p>
                    </TableCell>
                    <TableCell>
                        <CustomerDelete id={this.props.id} stateRefresh={this.props.stateRefresh} ></CustomerDelete>
                    </TableCell>
                </TableRow>



                {this.state.isInfo && <CustomerInfo open={this.state.isInfo} selectCustomer={this.state.selectCustomer} stateRefresh={this.props.stateRefresh} onClose={this.onClose} />}

            </>
        )
    }
}



export default Customer;