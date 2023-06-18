import {Outlet} from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import {Layout} from "antd";
import '../css/Root.css'

export default function Root() {
    return (
        <>
            <Layout >
                <Header/>
            </Layout>
            <Layout>
                <Sidebar/>
                <Outlet/>
            </Layout>
        </>
    );
}