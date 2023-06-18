import React, { Component } from 'react';
import { Form, Input, Button, Rate } from 'antd';
import CommentService from '../services/CommentService';
import {currentUser} from "./userLoginForm";

class CommentFormComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            submitting: false,
            value: '',
            rate: 3,
        };
    }

    handleSubmit = async () => {
        const { dishId, onCommentSubmit } = this.props;
        const { value, rate } = this.state;
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const userId = currentUser.userID;
        if (!value) {
            return;
        }

        this.setState({ submitting: true });

        // 发送评论数据到后端
        const comment = {
            dishId:dishId,
            userId: userId,
            content: value,
            rate: rate,
            likes: 0,
            timeStamp: Date.now(),
        };
        console.log(comment)
       await CommentService.sendComment(comment);

        onCommentSubmit(comment);

        this.setState({ submitting: false, value: '' });
    };

    handleChange = (e) => {
        this.setState({ value: e.target.value });
    };

    handleRateChange = (value) => {
        this.setState({ rate: value });
    };

    render() {
        const { submitting, value, rate } = this.state;

        return (
            <Form onFinish={this.handleSubmit}>
                <Form.Item>
                    <Input.TextArea rows={4} onChange={this.handleChange} value={value} />
                </Form.Item>
                <Form.Item>
                    <Rate defaultValue={rate} onChange={this.handleRateChange} />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" loading={submitting} type="primary">
                        提交评论
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default CommentFormComponent;
