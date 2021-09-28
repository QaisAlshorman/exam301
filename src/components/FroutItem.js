import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react'

class FroutItem extends Component {
    addToFav = (item) => {
        const { user } = this.props.auth0;
        const obj = {
            ownerEmail: user.email,
            name: item.name,
            image: item.image,
            price: item.price
        }
        axios
            .post(`${process.env.REACT_APP_SERVER}/addToFav`, obj)
            .then(result => {
                console.log(result.data);
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={this.props.item.image} />
                    <Card.Body>
                        <Card.Title>{this.props.item.name}</Card.Title>
                        <Card.Text>
                           {this.props.item.price}
                        </Card.Text>
                        <Button variant="primary" onClick={()=> this.props.addToFav(this.props.item)}>Go somewhere</Button>
                    </Card.Body>
                </Card>

            </div>
        );
    }
}

export default withAuth0(FroutItem);