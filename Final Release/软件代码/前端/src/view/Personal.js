import React, { Component } from 'react';
import {Input, Button, message, Layout, Avatar, List} from 'antd';
import DishForm from '../components/dishUploader';
import {currentUser} from "../components/userLoginForm";
import '../css/dishuploader.css'
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import {Link, Outlet} from "react-router-dom";
import {CommentCard} from "../components/commentCard";

function generateColor(param) {
    const hashCode = hashCodeFromString(param);

    const red = hashCode % 256;
    const green = (hashCode >> 8) % 256;
    const blue = (hashCode >> 16) % 256;

    return `rgb(${red}, ${green}, ${blue})`;
}

function hashCodeFromString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash = hash & hash;
    }
    return hash;
}

class PersonalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            currentUser: JSON.parse(localStorage.getItem('currentUser')),
            avatarColor: '',
            myComments: [],
            role: 0 // 0表示普通用户，1表示食堂工作人员
        };
    }
    componentDidMount() {
        //fetch(`http://localhost:8080/user/${currentUser.userID}`)
        fetch(`http://localhost:8080/user/${this.state.currentUser.userID}`)
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
                const { username, password, intro } = data;
                this.setState({
                    //myComments: data.map(item => item),
                    avatarColor: generateColor(this.props.userId + this.props.username)
                })
                console.log(`用户名：${username}，密码：${password}`);
            })
            .catch(error => {
                // 请求失败，error 包含了错误信息
                console.error(error);
            });

        fetch(`http://localhost:8080/getMyCommentsById/${this.state.currentUser.userID}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    myComments: data.map(item => item),
                })
                //console.log("color: ", this.state.avatarColor);
            })
            .catch(error => {
                console.error(error);
            });
    }

    handleTogglePassword = () => {
        this.setState(prevState => ({
            showPassword: !prevState.showPassword
        }));
    };

    handleUploadDish = () => {
        console.log('Upload dish');
        // 这里可以添加上传菜品的逻辑
    };

    render() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const  userInfo  = currentUser;
        const { showPassword, role } = this.state;
        console.log(currentUser);
        return (
            <>
                <Layout >
                    <Header/>
                </Layout>
                <Layout>
                    <Sidebar/>
                    <div className="person_page">
                        <h1 className="title">用户信息</h1>
                        <div className="userinformation_content">
                            <div className="line_content">
                                <div className="text1">用户ID：</div>
                                <div className="text2">{userInfo.username}</div>
                            </div>
                            {/*<Avatar*/}
                            {/*    style={{ backgroundColor: this.state.avatarColor, color: '#ffffff' }}*/}
                            {/*    size={"large"}*/}
                            {/*>*/}
                            {/*    {userInfo.username[0]}*/}
                            {/*</Avatar>*/}
                            {/*<h2>{this.state.currentUser.username}</h2>*/}
                            <div className="line_content">
                                <div className="text1">身份：</div>
                                <div className="text2"> {userInfo.role === 1 ? '食堂工作人员' : '普通用户'}</div>
                                {userInfo.role === 1 && (
                                    <div>
                                        <Link className="tianjia" to={'/home/UploadDish'}>添加菜品</Link>
                                    </div>
                                )}
                            </div>
                            <div className="line_content">
                                <div className="text1">
                                    密码：
                                </div>
                                <div className="text2">
                                    {showPassword ? (
                                        <p>{userInfo.password} </p>
                                    ) : (
                                        <p>******</p>
                                    )}
                                    <Button onClick={this.handleTogglePassword}>
                                        {showPassword ? '隐藏' : '显示'}
                                    </Button>
                                </div>
                            </div>
                            <p>个人介绍：</p>
                            <div className="self_intro_content">
                                <p className="self_intro">{this.state.currentUser.intro}</p>
                            </div>

                            <Link to={"/home/ProfileModify"}>修改信息</Link>
                        </div>
                        {/*{userInfo.role === 1 && (*/}
                        {/*    <div>*/}
                        {/*        <DishForm onUpload={this.handleUploadDish} />*/}
                        {/*    </div>*/}
                        {/*)}*/}
                        <h1>我的评论</h1>
                        <List
                            grid={{gutter: 3, column: 1}}
                            dataSource={this.state.myComments}
                            renderItem={item => (
                                <List.Item>
                                    <CommentCard
                                        commentId={item.commentId}
                                        userId={item.userId}
                                        picUrl={item.picUrl}
                                        comment={item.content}
                                        rate={item.rate}
                                        likes={item.likes}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </Layout>
            </>
        );
    }
}

export default PersonalInfo;
