import React, { Component } from 'react';
import { Container, Jumbotron, Row, Col } from 'reactstrap';
import AppNavbar from './AppNavbar';
import MyProvider from './MyProvider';
import WelcomeCarousel from './WelcomeCarousel';
import './Welcome.css';


import './App.css';

class Welcome extends Component {
  render() {
    return (
      <div className="App">
        <MyProvider
          push={this.props.history.push}
          logInUser={this.props.logInUser}
        >
          <AppNavbar
            push={this.props.history.push}
            logInUser={this.props.logInUser}
          />
        </MyProvider>
          <WelcomeCarousel fluid/>
          <Jumbotron>
            <Container>
              <Row>
                <Col
                sm='6'
                className='content' tag='div'>
                  <img alt='foodpic' className='content-img' tag='div' src='img/potato.jpg' />
                </Col>
                <Col
                sm='6'
                className='content' tag='div'>
                  <p>Lorem ipsum dolor sit amet. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
                  </p>
                </Col>
              </Row>
            </Container>
          </Jumbotron>


          <Jumbotron className='jumbo2' tag='div'>
            <Container>
              <Row>
              <Col
                className='jumbo2-content'
                sm='6'
                tag='div'>
                  <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
                  </p>
                </Col>
                <Col
                sm='6'
                tag='div'>
                  <img alt='foodpic'
                  tag='div'
                  className='jumbo2-img'
                  src='img/grocerystore.jpg' />
                </Col>
              </Row>
            </Container>
          </Jumbotron>


        <Jumbotron>
          <Container>
            <Row>
              <Col
              sm='6'
              className='content'>
                <img alt='foodpic' className='content-img' src='img/shoppinglist.jpg' />
              </Col>
              <Col
              sm='6'
              className='content'>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
                </p>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default Welcome;