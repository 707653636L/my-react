import React,{Component} from 'react'
import {connect} from 'react-redux'

class WebSocket extends Component{

    
    getWebSocket(){
        var webSocket = new WebSocket('ws://localhost:8080/chat')

        //当服务端打开连接
        webSocket.onopen = (event) => {
            console.log('websocket打开连接')
        }

        //当服务端发来消息  1.广播消息 2.更新在线人数
        webSocket.onmessage = (event) => {
            // console.log("websocket收到消息：" + event.data) 
            var message = JSON.parse(event.data) || {}

            //发言
            if(message.type === "SPEAK"){
                // console.log("SPEAK length:" + this.props.msgList.length)
                let mes = {
                    msg: message.msg,
                    type: message.type,
                    username : message.username,
                    onlineCount : message.onlineCount
                }
                let tempList = this.props.msgList
                tempList.push(mes)
                this.props.updateMsg(tempList)
                // if(this.state.msgList.length < 10){
                //     let tempList = this.state.msgList
                //     tempList.push(mes)
                //     this.setState({
                //         msgList : tempList
                //     },function(){
                //         console.log("1 this.state.msgList.length < 10")
                //         this.state.msgList.forEach(element => {
                //             console.log(element)
                //         });
                //     })
                // }else{
                //     var tempList = this.state.msgList.slice(1,9)
                //     tempList.push(mes)
                //     //截取第二个到第10个
                //     this.setState({
                //         msgList : tempList
                //     },function(){
                //         console.log("2 this.state.msgList.length = > 10")
                //         this.state.msgList.forEach(element => {
                //             console.log(element)
                //         });
                //     })
                // }
            }
            // this.setState({
            //     onlineCount : message.onlineCount
            // })
        }
    
        webSocket.onclose = (event) => {
            console.log('webSocket关闭连接')
        }

        webSocket.onerror = (event) => {
            console.log('websocket发生异常')
        }

        return webSocket;
    }
}

const mapState = (state)=>{
    return{
        msgList : state.pane.msgList
    }
}
const mapDispatch = (dispatch)=>{
    return{
        updateMsg(tempList){
            dispatch({
                type:"updateMsg",
                data:tempList
            })
        }
    }
   
}

export default connect(mapState,mapDispatch)(WebSocket);