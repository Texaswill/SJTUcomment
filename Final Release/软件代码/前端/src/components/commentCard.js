import { UserOutlined } from '@ant-design/icons';
import {Avatar, Button, Card, Space, Typography} from 'antd';
import React from 'react';
import axios from "axios";
const { Meta } = Card;
const { Paragraph } = Typography;


function generateColor(param) {
    // 使用哈希函数将参数转换为整数
    const hashCode = hashCodeFromString(param);

    // 将整数映射到 RGB 范围内的值
    const red = hashCode % 256;
    const green = (hashCode >> 8) % 256;
    const blue = (hashCode >> 16) % 256;

    // 返回 RGB 颜色值
    return `rgb(${red}, ${green}, ${blue})`;
}

// 简单的哈希函数，将字符串转换为整数
function hashCodeFromString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash = hash & hash; // 保留32位有符号整数
    }
    return hash;
}

export class CommentCard extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            avatarColor: '',
            likes: this.props.likes,
            liked: 0
        };
    }

    handleLike = async (commentId) => {
        try {
            if (this.state.liked === 0) {
                await axios.post(`http://localhost:8080/comments/${commentId}/like`);
                this.setState({
                    liked: 1,
                    likes: this.state.likes + 1
                })
            }
            else {
                await axios.post(`http://localhost:8080/comments/${commentId}/cancelLike`);
                this.setState({
                    liked: 0,
                    likes: this.state.likes - 1
                })
            }
            console.log("liked: ", this.state.liked)
        } catch (error) {
            console.error(error);
        }
    };

    Picture (url) {
        if (url===null){
            return(
                <br></br>
            );
        }else {
            return (
                <img
                alt="foodPic"
                src={url}
                style={{ height: '100%' }}
            />
            );
        }
    }

    componentDidMount() {
        fetch(`http://localhost:8080/user/getById/${this.props.userId}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    username: data.username,
                    avatarColor: generateColor(this.props.userId + data.username)
                })
                console.log("color: ", this.state.avatarColor);
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        return (
            <Card>
                <Meta
                    avatar={
                        <Avatar
                            style={{ backgroundColor: this.state.avatarColor, color: '#ffffff' }}
                        >
                            {this.state.username[0]}
                        </Avatar>
                    }
                    title={this.state.username}
                    // description={
                    //     <Paragraph>
                    //         {this.props.comment}
                    //     </Paragraph>
                    // }
                />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 'auto'
                    }}
                >
                    {this.Picture(this.props.picUrl)
                        }
                </div>
                <div>
                    <Paragraph>
                        {this.props.comment}
                    </Paragraph>
                </div>
                <Button onClick={() => this.handleLike(this.props.commentId)}>点赞</Button>
                <span style={{ marginLeft: 8 }}>{this.state.likes} 点赞</span>
            </Card>

            )
    }
}
