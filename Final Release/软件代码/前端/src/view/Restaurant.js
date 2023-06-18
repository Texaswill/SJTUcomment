import {Card, List} from "antd";
import React, {useState} from "react";
import {Link} from "react-router-dom";

const photoStyle = {
    width: 150,
    height: 150,
    margin: "20px auto"
};
const textStyle = {
    textAlign: 'middle',
};

const data=[
    {
        id:1,
        name:"一餐",
        photo:"1.png"
    },
    {
        id:2,
        name:"二餐",
        photo:"2.png"
    },
    {
        id:3,
        name:"三餐",
        photo:"3.jpg"
    },
    {
        id:4,
        name:"四餐",
        photo:"4.png"
    },
    {
        id:5,
        name:"五餐",
        photo:"5.jpg"
    },
    {
        id:6,
        name:"六餐",
        photo:"6.png"
    },
    {
        id:7,
        name:"七餐",
        photo:"7.jpg"
    },
    {
        id:8,
        name:"玉兰苑",
        photo:"8.png"
    },
]

export default function Restaurant() {

    return (
        <div>
            <List
                grid={{gutter: 3, column: 1}}
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <Link to={{pathname:`/home/RestaurantDetails`, search: `?name=${item.id}` }}
                        >

                            <Card  bordered={true} hoverable={true}
                                   cover={<img style={photoStyle} src={require('../PIC/'+item.photo)} alt="xxxiyou"/>}
                            >
                                <a  style={textStyle}>{item.name}</a>
                            </Card>
                        </Link>
                    </List.Item>
                )
                }
            />
            );

        </div>
    );
}