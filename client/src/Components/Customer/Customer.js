import React from 'react';
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import CustomerDelete from './CustomerDelete';
class Customer extends React.Component {
    render() {
        return (
            <>
                <TableRow className={this.props.className}>
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
            </>
        )
    }
}



export default Customer;