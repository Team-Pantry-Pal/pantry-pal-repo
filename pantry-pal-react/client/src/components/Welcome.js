import React, { Component } from 'react';
import { Container, Jumbotron, Row, Col } from 'reactstrap';
import AppNavbar from './AppNavbar';
import Dummy from './Dummy';
import MyProvider from './MyProvider';
import WelcomeCarousel from './WelcomeCarousel';
import './Welcome.css'; 


import './App.css';

class Welcome extends Component {
  render() {
    return (
      <div className="App">
        <AppNavbar />
          <WelcomeCarousel fluid/>
          <Jumbotron>
            <Container>
              <Row>
                <Col 
                sm='6' 
                className='content' tag='div'>
                  <img alt='foodpic' className='content-img' tag='div' src='img/food.jpg' />
                </Col>
                <Col 
                sm='6' 
                className='content' tag='div'>
                  <p>texgkls;gjls;gjsal;gjlfgtexgkls;gjls;gjsal;gjlfgtexgkls;gjls;gjsal;gjlfg
                  texgkls;gjls;gjsal;gjlfgtexgkls;gjls;gjsal;gjlfgtexgkls;gjls;gjsal;gjlfgtexgkls;gjls;gjsal;gjlfg
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
                  <p>texgkls;gjls;gjsal;gjlfgtexgkls;gjls;gjsal;gjlfgtexgkls;gjls;gjsal;gjlfg
                  texgkls;gjls;gjsal;gjlfgtexgkls;gjls;gjsal;gjlfgtexgkls;gjls;gjsal;gjlfgtexgkls;gjls;gjsal;gjlfg
                  </p>
                </Col>
                <Col 
                sm='6' 
                tag='div'>
                  <img alt='foodpic'
                  tag='div' 
                  className='jumbo2-img'
                  src='img/food.jpg' />
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
                <img alt='foodpic' className='content-img' src='img/food.jpg' />
              </Col>
              <Col 
              sm='6' 
              className='content'>
                <p>texgkls;gjls;gjsal;gjlfgtexgkls;gjls;gjsal;gjlfgtexgkls;gjls;gjsal;gjlfg
                texgkls;gjls;gjsal;gjlfgtexgkls;gjls;gjsal;gjlfgtexgkls;gjls;gjsal;gjlfgtexgkls;gjls;gjsal;gjlfg
                </p>
              </Col>
            </Row>
          </Container>
        </Jumbotron>


        <br />
        <Container>
          <MyProvider push={this.props.history.push}>
            <Dummy />
          </MyProvider>
        </Container>
      </div>
    );
  }
}

export default Welcome;