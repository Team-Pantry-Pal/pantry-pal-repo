import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";
import styles from '../styles/WelCar.module.css';

const items = [
  {
    src: "img/food.jpg",
    caption: "Slide 1",
  },
  {
    src: "img/food2.jpg",
    altText: "Slide 2",
    caption: "Slide 2"
  },
  {
    src: "img/food3.jpg",
    altText: "Slide 3",
    caption: "Slide 3"
  },
  {
    src: "img/food4.jpg",
    altText: "Slide 4",
    caption: "Slide 4"
  }
];

class WelCar extends Component {
  state = { activeIndex: 0 };

  onExiting = () => {
    this.animating = true;
  };

  onExited = () => {
    this.animating = false;
  };

  next = () => {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  };

  previous = () => {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  };

  goToIndex = newIndex => {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;

    const slides = items.map(item => (
      <CarouselItem
        className={styles.carItem}
        onExiting={this.onExiting}
        onExited={this.onExited}
        key={item.src}
      >
        <img
          src={item.src}
          alt={item.altText}
          className="d-block w-100"
          tag="div"
        />
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        />
      </CarouselItem>
    ));

    return (
      <Carousel
      activeIndex={activeIndex}
      next={this.next}
      previous={this.previous}
      ride="carousel"
      >
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={this.goToIndex}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={this.previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={this.next}
        />
      </Carousel>
    );
  }
}

export default WelCar;