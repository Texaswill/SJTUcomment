import React, { Component } from 'react';
import {Card, Button, List} from 'antd';
import {Link} from "react-router-dom"
import '../css/cardlist.css'
const { Meta } = Card;


class CardListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sort: 'recommend',
            data:[],
        };
    }

    handleSortChange(sort) {
        this.setState({ sort });
    }

    render() {

        const { data, sort } = this.props;
        console.log(data);
        let sortedData = data;
        if (sort === 'hot') {
            sortedData = data.sort((a, b) => a.hot - b.hot);
        } else if (sort === 'recommend') {
            sortedData = data.sort((a, b) => a.cos - b.cos);
        }

        return (
            <div className="card-list">
                <div className="card-list-header">
                    <div className="card-list-title">推荐商品</div>
                    <div className="card-list-sort">
                        <Button className="button" type={sort === 'recommend' ? 'primary' : 'default'} onClick={() => this.handleSortChange('recommend')}>
                            按推荐排序 ▽
                        </Button>
                        <Button className="button" type={sort === 'hot' ? 'primary' : 'default'} onClick={() => this.handleSortChange('hot')}>
                            按热点排序 ▽
                        </Button>
                    </div>
                </div>
                <div className="card-list-content" >
                    {sortedData.map(item => (

                        // <Card  cover={<img src={item.imgUrl} style={{height:220 ,width:400}} alt="something wrong"/>}>
                        //     <div className="card-item-body">
                        //         <div
                        //             style={{
                        //                 display: 'flex',
                        //                 justifyContent: 'center',
                        //                 alignItems: 'center',
                        //                 height: 10
                        //             }}
                        //         >
                        //         </div>
                        //         <div className="card-item-title">{item.name}</div>
                        //         <div className="card-item-location">{location(item.location)}</div>
                        //         <div className="card-item-price">¥{item.price}</div>
                        //         <Button type="primary" href={`/detail/${item.dishId}`}>查看详情</Button>
                        //     </div>
                        // </Card>
                        <Card>
                            <div className="card">
                                <div className="picture-content">
                                    <img className="picture" src={item.imgUrl} alt="something wrong"/>
                                </div>
                                <div className="card-item-content">
                                    <div className="card-item-body">
                                        <div className="title-location-content">
                                            <div className="card-item-title">{item.name}</div>
                                            <div className="card-item-location"><img className="location-icon" src={require("../icons/location_icon.png")} alt="something wrong"/>{location(item.location)}</div>
                                        </div>
                                        <div className="card-item-price">¥{item.price}</div>
                                        <div className="button-container">
                                            <Button type="primary" href={`/detail/${item.dishId}`}>查看详情</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                    ))}
                </div>

                );
            </div>
        );
    }
}
function location(location)
{
    let restaurant = "";
    switch (location)
    {

        case 0:  restaurant = "第一餐饮大楼";break;
        case 1 : restaurant = "第二餐饮大楼";break;
        case 2 : restaurant = "第三餐饮大楼";break;
        case 3 : restaurant = "第四餐饮大楼";break;
        case 4 : restaurant = "第五餐饮大楼";break;
        case 5 : restaurant = "第六餐饮大楼";break;
        case 6 : restaurant = "第七餐饮大楼";break;
        case 7 : restaurant = "玉兰苑";break;
        case 8 : restaurant = "哈乐餐厅";break;
    }
    return restaurant;
}
export default CardListComponent;
