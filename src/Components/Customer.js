import React from 'react';
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Table from '@material-ui/core/TableCell'


class Customer extends React.Component {



    render() {
        return (
            <>
                <TableRow>
                    <TableCell>
                        <p>{this.props.id}</p>
                    </TableCell>
                    <TableCell>
                        <img src={this.props.image} alt='profile' ></img>
                    </TableCell>
                    <TableCell>
                        <p>{this.props.name}</p>
                    </TableCell>
                    <TableCell>
                        <p>{this.props.birthDay}</p>
                    </TableCell>
                    <TableCell>
                        <p>{this.props.gender}</p>
                    </TableCell>
                    <TableCell>
                        <p>{this.props.job}</p>
                    </TableCell>

                </TableRow>
            </>
        )
    }
}



export default Customer;