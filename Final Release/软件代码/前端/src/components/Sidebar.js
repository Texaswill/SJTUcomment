import React from "react";
import {Button, Layout} from "antd";
import '../css/Root.css'

var {Sider}=Layout;
var sidestyle={
    backgroundColor:'#dc3d00',
    height:"auto",

}
export default function Side(){
    return(
        <Sider width={100} style={sidestyle} defaultCollapsed={false} breakpoint={"xs"}>
            <div>
                <a href="/home" colorscheme="none" class="color-none">
                    <div className="icon_container">
                        <img className="icon" src={require('../icons/recommend_icon.png')} title={"推荐"}/>
                        <span className="icon_name">推荐</span>
                    </div>
                </a>

                <a href="/home/Restaurant" colorscheme="none" className="color-none">
                    <div className="icon_container">
                        <img className="icon" src={require('../icons/canteen_icon.png')} title={"餐厅"}/>
                        <span className="icon_name">餐厅</span>
                    </div>
                </a>
                {/*<a href="/order" colorscheme="none" className="color-none">*/}
                {/*    <div className="icon_container">*/}
                {/*        <img className="icon" src={require('../icons/flavor_icon.png')} title={"口味"}/>*/}
                {/*        <span className="icon_name">口味</span>*/}
                {/*    </div>*/}
                {/*</a>*/}
                <a href="/home/Community" colorscheme="none" className="color-none">
                    <div className="icon_container">
                        <img className="icon" src={require('../icons/community_icon.png')} title={"社区"}/>
                        <span className="icon_name">社区</span>
                    </div>
                </a>
                {/*<a href="/order" colorscheme="none" className="color-none">*/}
                {/*    <div className="icon_container">*/}
                {/*        <img className="icon" src={require('../icons/settings_icon.png')} title={"设置"}/>*/}
                {/*        <span className="icon_name">设置</span>*/}
                {/*    </div>*/}
                {/*</a>*/}
                {/*<Button style={{backgroundColor:'#FFEE99',width:100,left:10,position:"absolute"}} href="/home">*/}
                {/*    推荐</Button>*/}
                {/*<br/>*/}
                {/*<br/>*/}
                {/*<Button style={{backgroundColor:'#FFEE99',width:100,left:10,position:"absolute"}} href="/personalPage">*/}
                {/*    新品 </Button>*/}
                {/*<br/>*/}
                {/*<br/>*/}
                {/*<Button style={{backgroundColor:'#FFEE99',width:100,left:10,position:"absolute"}} href="/shoppingCart">*/}
                {/*    餐厅</Button>*/}
                {/*<br/>*/}
                {/*<br/>*/}
                {/*<Button style={{backgroundColor:'#FFEE99',width:100,left:10,position:"absolute"}} href="/order">*/}
                {/*    口味</Button>*/}
                {/*<br/>*/}
                {/*<br/>*/}
                {/*<Button style={{backgroundColor:'#FFEE99',width:100,left:10,position:"absolute"}} href="/home/Community">*/}
                {/*    社区</Button>*/}
                {/*<br/>*/}
                {/*<br/>*/}
                {/*<Button style={{backgroundColor:'#FFEE99',width:100,left:10,position:"absolute" }} href="/order">*/}
                {/*    设置</Button>*/}
            </div>
        </Sider>
    );
}