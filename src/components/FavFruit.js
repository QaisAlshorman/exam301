import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';
import UpdateForm from './UpdateForm';
class FavFruit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favArray: [],
      showFlage: false,
      fruitItem: {},
      id: '',
    }
  }
  componentDidMount = () => {
    const { user } = this.props.auth0;
    const obj = {
      ownerEmail: user.email
    }

    axios
      .get(`${process.env.React_APP_SERVER}/getFavFruit`, { params: obj })
      .then(result => {
        this.setState({
          favArray: result.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  showUpdateForm = (item) => {
    this.setState({
      showFlage: true,
      fruitItem: item,
      id: item._id
    })
  }
  handleClose = () => {
    this.setState({
      showFlage: false,

    })
  }

  update = (event) => {
    event.preventDefult();
    const { user } = this.props.auth0;
    const obj = {
      name: event.target.name.value,
      image: event.target.image.value,
      price: event.target.price.value,
      ownerEmail: user.email
    }
    axios
      .put(`${process.env.REAC_APP_SERVER}/apdateFav/${this.state.id}`, obj)
      .then(result => {
        this.setState({
          favArray: result.data
        })
          .catch(err => {
            console.log(err);
          })
        this.setState({
          showFlage: false
        })
      })
  }
  delete = (id) => {
    const { user } = this.props.auth0
    const obj = {
      ownerEmail: user.email
    }

    axios
      .delete(`${process.env.React_APP_SERVER}/deleteFav/${id}`, { params: obj })
      .then(result => {
        this.setState({
          favArray: result.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }
  render() {
    return (
      <>
        <h1>My Favorite Fruits</h1>
        <Row className="justify-content-md-center">
          {this.state.favArray.map((item, idx) =>
            <Col
            >

              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={item.image} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>

                    price:{item.price}
                  </Card.Text>
                  <Button variant="primary" onClick={() => this.showUpdateForm(item, item._id)}>update</Button>
                  <Button variant="primary" onClick={() => this.delete(item, item._id)}>delete</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {this.state.showFlage &&
          <UpdateForm
            showFlage={this.state.showFlage}
            handleClose={this.handleClose}
            update={this.update}

          />
        }

      </>
  
    )


  }

          

}
}

export default withAuth0(FavFruit);
