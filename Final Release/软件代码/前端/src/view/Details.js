import React from "react";
import DishDetailComponent from "../components/DishDetail";
import ApiService from "../services/ApiService";
import {withRouter} from "../routes/withRouter";
import {Layout} from "antd";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import {Outlet} from "react-router-dom";

class DishDetailView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dish:{}
            ,
            comments: []

        };
    }

    componentDidMount() {
        const { location } = this.props;
        const id = location.pathname.split('/').pop();
        ApiService.fetchData(`http://localhost:8080/dish/${id}`).then((data) => {
            this.setState({ dish: data });

        });
        ApiService.fetchData(`http://localhost:8080/dishComments/${id}`).then((data) => {
            this.setState({ comments: data });

        });
    }

    render() {
        const { dish, comments } = this.state;
        return (
            <>
                <Layout >
                    <Header/>
                </Layout>
                <Layout>
                    <Sidebar/>
                    <DishDetailComponent dish={dish} comments={comments} />;
                </Layout>
            </>
        );
    }
}

export default  withRouter(DishDetailView);
