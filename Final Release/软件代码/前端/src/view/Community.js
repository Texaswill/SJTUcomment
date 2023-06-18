import React, { Component } from "react";
import { Avatar, Card } from "antd";
import ApiService from "../services/ApiService";

class Community extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            sort: "hot",
        };
    }

    componentDidMount() {
        // 请求后端数据
        this.fetchData();
    }

    // 获取后端数据
    fetchData() {

        const url = `http://localhost:8080/comments/getAll`;
        ApiService.fetchData(url).then((data) => {
            this.setState({ data });
        });
    }

    // 切换排序方式
    handleSortChange(sort) {
        this.setState({ sort }, () => {
            this.fetchData();
        });
    }

    render() {
        const { data, sort } = this.state;
        console.log(data);
        return (
            <div>
                {/* 排序方式 */}


                {/* 社区卡片列表 */}
                <div>
                    {data.map((item) => (
                        <Card
                            key={item.id}
                            className="community-card"
                            cover={<img src={item.imgUrl} alt={item.title} />}
                            hoverable
                        >
                            <Card.Meta
                                avatar={<Avatar src={item.avatarUrl} />}
                                title={item.username}
                                description={item.createdAt}
                            />
                            <div>{item.content}</div>
                            <div>{`评论数：${item.commentCount}`}</div>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }
}

export default Community;
