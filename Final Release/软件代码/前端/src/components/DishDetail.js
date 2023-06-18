import React, { Component } from 'react';
import { Avatar, Button, Carousel, Divider, Form, List, Modal, Rate, Tag } from 'antd';
import { CommentOutlined, EnvironmentOutlined } from '@ant-design/icons';
import CommentFormComponent from '../components/CommentFormComponent';
import CommentService from '../services/CommentService';
import CommentInputBox from "./commentInputBox";
import {currentUser} from "./userLoginForm";
import '../css/detail.css'
import {CommentCard} from "./commentCard";
class DishDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentVisible: false,
            comments: props.comments,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.comments !== this.props.comments) {
            this.setState({ comments: this.props.comments });
        }
    }

    // 打开评论对话框
    showCommentModal = () => {
        this.setState({ commentVisible: true });
    };

    // 关闭评论对话框
    hideCommentModal = () => {
        this.setState({ commentVisible: false });
    };

    // 处理评论提交事件
    handleCommentSubmit = (comment) => {
        const { comments } = this.state;
        const updatedComments = [...comments, comment];
        this.setState({ comments: updatedComments });
    };

    // 点赞评论
    handleLike = async (commentId) => {
        const { comments } = this.state;

        try {
            const updatedComment = await CommentService.likeComment(commentId);
            const index = comments.findIndex((comment) => comment.commentId === commentId);
            const updatedComments = [...comments.slice(0, index), updatedComment, ...comments.slice(index + 1)];
            this.setState({ comments: updatedComments });
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        const {dishId, name, price, location, flavor, description, imgUrl } = this.props.dish;
        const userId = currentUser.userID;
        const { commentVisible, comments } = this.state;

        return (
            <div className="detail-page-container">
                <div className="dish-detail-container">
                    <div className="img-info-container">
                        <div className="img-container">
                            <img className="img" src={imgUrl} alt={name} />
                        </div>

                        {/* 菜品名称、价格、餐厅地址、口味tag */}
                        <div className="dish-info-container">
                            <div className="dish-info">
                                <h1 className="name">{name}</h1>
                                <p className="price">{`¥ ${price}`}</p>
                                <p className="address">
                                    <EnvironmentOutlined />
                                    {restaurant(location)}
                                </p>
                                <div>
                                    <Tag className="tag" color="blue">{flavor}</Tag>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Divider />

                    {/* 简介 */}
                    <div className="intro">
                        <h2>简介</h2>
                        <p>{description}</p>
                    </div>

                    <Divider />

                    {/* 评论 */}
                    <div className="comments">
                        <h2>
                            评论 <CommentOutlined onClick={this.showCommentModal} />
                        </h2>
                        <List
                            grid={{gutter: 3, column: 1}}
                            dataSource={comments}
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
                        {/*<List*/}
                        {/*    dataSource={comments}*/}
                        {/*    itemLayout="horizontal"*/}
                        {/*    renderItem={(comment) => (*/}
                        {/*        <List.Item>*/}
                        {/*            <List.Item.Meta*/}
                        {/*                avatar={<Avatar src={comment.avatar} alt={comment.author} />}*/}
                        {/*                title={<a href="#">{comment.author}</a>}*/}
                        {/*                description={*/}
                        {/*                    <span>*/}
                        {/*                      <Rate disabled defaultValue={comment.rate} />*/}
                        {/*                      <span style={{ marginLeft: 8 }}>{`${comment.likes} 点赞`}</span>*/}
                        {/*                    </span>*/}
                        {/*                }*/}
                        {/*            />*/}
                        {/*            <p>{comment.content}</p>*/}
                        {/*            <Button onClick={() => this.handleLike(comment.commentId)}>点赞</Button>*/}
                        {/*            */}
                        {/*        </List.Item>*/}
                        {/*    )}*/}
                        {/*/>*/}
                        <CommentFormComponent  dishId={dishId} userId={userId} onCommentSubmit={this.handleCommentSubmit} />
                    </div>

                    {/* 评论对话框 */}
                    <Modal
                        visible={commentVisible}
                        title="查看评论"
                        footer={null}
                        onCancel={this.hideCommentModal}
                        destroyOnClose={true}
                    >
                        <CommentList comments={comments} handleLike={this.handleLike} />
                    </Modal>
                </div>
            </div>
        );
    }
}

// 评论列表组件
const CommentList = ({ comments, handleLike }) => (
    <List
        dataSource={comments}
        renderItem={(comment) => (
            <List.Item>
                <List.Item.Meta
                    avatar={<Avatar src={comment.avatar} alt={comment.author} />}
                    title={<a href="#">{comment.author}</a>}
                    description={
                        <span>
              <Rate disabled defaultValue={comment.rate} />
              <span style={{ marginLeft: 8 }}>{`${comment.likes} 点赞`}</span>
            </span>
                    }
                />
                <p>{comment.content}</p>
                <Button onClick={() => handleLike(comment.commentId)}>点赞</Button>
            </List.Item>
        )}
    />
);
function restaurant(location)
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
export default DishDetailComponent;
