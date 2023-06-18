import axios from 'axios';

class CommentService {
    // 发送评论
    static async sendComment(comment) {
        console.log(comment)
        try {
            const response = await fetch('http://localhost:8080/comments/upload', {
                method: 'POST',
                body: JSON.stringify(comment),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    // 点赞评论
    static async likeComment(commentId) {
        try {
            const response = await fetch(`http://localhost:8080/comments/${commentId}/like`, {
                method: 'POST'
            });

            const data = await response.json();
            console.log(data)
            return data;
        } catch (error) {
            console.error(error);
        }
    }
}

export default CommentService;
