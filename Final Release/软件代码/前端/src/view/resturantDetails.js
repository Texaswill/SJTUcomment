import {useLocation} from "react-router";
import React, {useState} from "react";
import {Button, Card, List} from "antd";
import {Link} from "react-router-dom";

const photoStyle = {
    width: 150,
    height: 150,
    margin: "20px auto"
};
const textStyle = {
    textAlign: 'middle',
};
export default function RestaurantDetails() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get('name');
    var integer = parseInt (name, 1);
    const [result,setResult]=useState('');
    fetch(`http://localhost:8080/dish/restaurant?name=${name}`)
        .then(response => {
            if (response.ok) {
                return response.json(); // 将响应内容解析为 JSON 对象
            } else {
                throw new Error('请求失败');
            }
        })
        .then(data => {
            console.log(data)
            // 请求成功，data 包含了返回的数据
            setResult(data);
        })
        .catch(error => {
            // 请求失败，error 包含了错误信息
            console.error(error);
        });


    return (
        <div>
            <List
                grid={{gutter: 3, column: 2}}
                dataSource={result}
                renderItem={item => (
                    <List.Item>
                        <Link to={{pathname:`/detail/${item.dishId}`}}
                        >

                            <Card  bordered={true} hoverable={true}
                                   cover={<img style={photoStyle} src={item.imgUrl} alt="xxxiyou"/>}
                            >
                                <a  style={textStyle}>{item.name}</a>
                                <Button type="primary" href={`/detail/${item.dishId}`}>查看详情</Button>
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