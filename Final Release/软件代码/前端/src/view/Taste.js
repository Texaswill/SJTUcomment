import React, { Component } from 'react';
import { Checkbox, Row, Col, Card } from 'antd';
import ApiService from '../services/ApiService';
import {CheckboxValueType} from "antd/es/checkbox/Group";

class Taste extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flavors: [],
            selectedFlavors: [],
            dishes: [],
        };
    }

    componentDidMount() {
        ApiService.fetchData('/api/flavors').then((flavors) => {
            this.setState({ flavors });
        });

        ApiService.fetchData('/api/dishes').then((dishes) => {
            this.setState({ dishes });
        });
    }

    handleFlavorChange = (checkedValue: CheckboxValueType[]) => {
        const { selectedFlavors } = this.state;

        checkedValue.forEach((value) => {
            if (!selectedFlavors.includes(value)) {
                selectedFlavors.push(value);
            }
        });

        this.setState({ selectedFlavors });
    };

    render() {
        const { flavors, selectedFlavors, dishes } = this.state;
        let filteredDishes = dishes;

        selectedFlavors.forEach((flavor) => {
            filteredDishes = filteredDishes.filter((dish) => {
                return dish.flavors.includes(flavor);
            });
        });

        return (
            <div className="flavor-list">
                <Row gutter={[16, 16]}>
                    <Col span={6}>
                        <h3>口味</h3>
                        <Checkbox.Group onChange={this.handleFlavorChange}>
                            {flavors.map((flavor) => (
                                <Checkbox key={flavor.id} value={flavor.id}>
                                    {flavor.name}
                                </Checkbox>
                            ))}
                        </Checkbox.Group>
                    </Col>
                    <Col span={18}>
                        <div className="dish-filter-result">
                            {filteredDishes.map((dish) => (
                                <Card key={dish.id} className="dish-item" cover={<img alt={dish.name} src={dish.imgUrl} />}>
                                    <div className="dish-item-body">
                                        <div className="dish-item-title">{dish.name}</div>
                                        <div className="dish-item-desc">{dish.desc}</div>
                                        <div className="dish-item-price">¥{dish.price}</div>
                                        <a href={`/detail/${dish.id}`}>查看详情</a>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Taste;
