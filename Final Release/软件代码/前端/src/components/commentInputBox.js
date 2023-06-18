import { Input, Button } from 'antd';
import {useState} from "react";

function CommentInputBox(props) {
    const [comment, setComment] = useState('');

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };



    const handleSubmit = () => {
        const newComment = {
            content: comment,
            userId: 1,
            timeStamp: Date.now(),
            rate: 5,
            likes: 0
        }
        console.log(JSON.stringify(newComment));
        fetch('http://localhost:8080/comments/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newComment)
        })
            //.then(response => response.json())
            .then(response => {
                if (response.ok)
                    setComment('');
            })
            .then(data => console.log(data))
            .catch(error => console.error(error));
    };

    return (
        <div>
            <Input
                rows={4}
                value={comment}
                onChange={handleCommentChange}
                placeholder="请输入评价"
                maxLength={1000}
            />
            <Button type="primary" onClick={handleSubmit}>提交</Button>
        </div>
    );
}

export default CommentInputBox;

