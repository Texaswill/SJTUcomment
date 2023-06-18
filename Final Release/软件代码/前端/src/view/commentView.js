import React, { useState, useEffect } from 'react';
import { List, Button } from 'antd';
import axios from 'axios';

const CommentPage = () => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await axios.get('http://localhost:8080/comments/getAll');
            setComments(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLike = async (commentId) => {
        try {
            await axios.post(`http://localhost:8080/comments/${commentId}/like`);
            // 更新点赞后的评论列表
            fetchComments();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>评论展示页</h1>
            <List
                dataSource={comments}
                renderItem={(comment) => (
                    <List.Item>
                        <List.Item.Meta title={comment.content} />
                        <Button onClick={() => handleLike(comment.commentId)}>点赞</Button>
                        <span style={{ marginLeft: 8 }}>{comment.likes} 点赞</span>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default CommentPage;
