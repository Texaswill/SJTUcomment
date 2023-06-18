import React from "react";
import {CommentCard} from "../components/commentCard";
import {Button, List, Space} from "antd";
import {Link} from "react-router-dom";
//import {currentUser, getCurrentUser} from "../components/LoginBox";


export let allComments;

export class CommunityView extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            commentData: []
        }
    }

    componentDidMount() {
        //const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
        //console.log(currentUser)
        //if (currentUser.role !== 0 && currentUser.role !== 1) {
        //    alert("Not authorized!")
        //    window.location.replace('http://localhost:3000')
        //}
        //else {
            fetch("http://localhost:8080/comments/getAll")
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        commentData: data.map(item => item)
                    })
                    allComments = data.map(item => item)
                    console.log("allComments: ", allComments)
                })
        //}
    }


    render() {
        //const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
        return <Space direction={"vertical"} align={"center"}>
            <List
                grid={{gutter: 3, column: 1}}
                dataSource={this.state.commentData}
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
            {/*{currentUser.role === 1 && (*/}
            {/*    <Link to = {{pathname : '/root/addBook'}}>*/}
            {/*        <Button>Add book</Button>*/}
            {/*    </Link>*/}
            {/*)}*/}
        </Space>
    }
}