import React, { Component } from 'react';
import { Container, Jumbotron, Row, Col } from 'reactstrap';
import AppNavbar from './AppNavbar';
import MyProvider from './MyProvider';
import WelCar from './WelCar';
import styles from '../styles/Welcome.module.css';

class Welcome extends Component {
  render() {
    return (
      <div className="app">
        <MyProvider
          push={this.props.history.push}
          logInUser={this.props.logInUser}
        >
          <AppNavbar
            push={this.props.history.push}
            logInUser={this.props.logInUser}
          />
        </MyProvider>
        <WelCar fluid />
        <Jumbotron className={styles.jumbotron}>
          <Container>
            <Row>
              <Col
                sm='6'
                className={styles.content}
              >
                <img
                  alt='foodpic'
                  className={styles.contentImg}
                  src='img/potato.jpg'
                />
              </Col>
              <Col
                sm='6'
                className={styles.content}
              >
                <p>Lorem ipsum dolor sit amet. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        <Jumbotron className={`${styles.jumbo2} ${styles.jumbotron}`}>
          <Container>
            <Row>
              <Col className={styles.jumbo2Content} sm='6'>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p>
              </Col>
              <Col sm='6'>
                <img
                  alt='foodpic'
                  className={styles.jumbo2Img}
                  src='img/grocerystore.jpg'
                />
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        <Jumbotron className={styles.jumbotron}>
          <Container>
            <Row>
              <Col className={styles.content} sm='6'>
                <img
                  alt='foodpic'
                  className={styles.contentImg}
                  src='img/shoppinglist.jpg'
                />
              </Col>
              <Col className={styles.content} sm='6'>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default Welcome;