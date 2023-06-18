import React, { Component } from 'react';
import { Carousel } from 'antd';
import '../css/Root.css'

class CarouselComponent extends Component {
    render() {
        const { data } = this.props;
        return (
            <div className="carouselcomponent">
                <img className="picture" src={require('../PIC/1.png')} alt="something wrong"/>
            </div>
        );
    }
}

export default CarouselComponent;
