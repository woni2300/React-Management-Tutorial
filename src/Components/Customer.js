import React from 'react';

class Customer extends React.Component {



    render() {
        return (
            <>
                <CustomerProfile id={this.props.id} name ={this.props.name} image={this.props.image} />
                <CustomerInfo birthDay={this.props.birthDay} gender= {this.props.gender} job={this.props.job} />
            </>
        )
    }
}


class CustomerProfile extends React.Component {
    render() {
        return (
            <>
                <div>
                    <img src={this.props.image} alt='profile' ></img>
                    <h2>{this.props.name}({this.props.id})</h2>
                </div>
            </>
        )
    }
}

class CustomerInfo extends React.Component {
    render() {
        return (
            <>
                <div>


                    <p>{this.props.birthDay}</p>
                    <p>{this.props.gender}</p>
                    <p>{this.props.job}</p>
                </div>
            </>
        )
    }
}

export default Customer;