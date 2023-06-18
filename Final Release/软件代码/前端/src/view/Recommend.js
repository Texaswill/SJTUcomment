import React, { Component } from 'react';
import Carousel from '../components/Carousel';
import CardList from '../components/CardList';
import ApiService from '../services/ApiService';
import "../css/cardlist.css"

class Recommend extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            carouselData: [ {
                id: 1,
                name: '宫保鸡丁',
                imgUrl: 'https://th.bing.com/th/id/OIP.mky156aRChywhu_eCC8J8gHaFj?pid=ImgDet&rs=1'
            },
                {
                    id: 2,
                    name: '水煮鱼',
                    imgUrl: "https://img1.baidu.com/it/u=1693964551,3798123943&fm=253&fmt=auto&app=138&f=JPEG?w=682&h=500"
                },
                {
                    id: 3,
                    name: '回锅肉',
                    imgUrl: 'https://img0.baidu.com/it/u=1222337550,725595556&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=666'
                }],
            cardListData: [],
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        // ApiService.fetchData('http://localhost:8080/carousel').then(data => {
        //     this.setState({ carouselData: data });
        // });
        const currentUser=JSON.parse(localStorage.getItem('currentUser'));
        const userID = currentUser.userID;
        console.log(userID);
        ApiService.fetchData(`http://localhost:8080/cardListData?id=${userID}`).then(data => {
            this.setState({ cardListData: data });
            console.log(data);
        });
    }

    render() {
        const { carouselData, cardListData } = this.state;

        return (
                        <div className="recommend-page">
                            <CardList url="/cardlist" data={cardListData} />
                        </div>
        );
    }
}

export default Recommend;