import React from 'react';
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import CustomerDelete from './CustomerDelete';
import CustomerInfo from './CustomerInfo'
class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : {},
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
                <TableRow className={this.props.className} onDoubleClick={() => this.rowDoubleClick(this.props.data)}>
                    <TableCell>
                        <p>{this.props.data.id}</p>
                    </TableCell>
                    <TableCell>
                        <img width={64} height={64} src={this.props.data.image} alt='profile' ></img>
                    </TableCell>
                    <TableCell>
                        <p>{this.props.data.name}</p>
                    </TableCell>
                    <TableCell>
                        <p>{this.props.data.birthday}</p>
                    </TableCell>
                    <TableCell>
                        <p>{this.props.data.gender}</p>
                    </TableCell>
                    <TableCell>
                        <p>{this.props.data.job}</p>
                    </TableCell>
                    <TableCell>
                        <CustomerDelete id={this.props.data.id} stateRefresh={this.props.stateRefresh} ></CustomerDelete>
                    </TableCell>
                </TableRow>



                {this.state.isInfo && <CustomerInfo open={this.state.isInfo} selectCustomer={this.state.selectCustomer} stateRefresh={this.props.stateRefresh} onClose={this.onClose} />}

            </>
        )
    }
}



export default Customer;