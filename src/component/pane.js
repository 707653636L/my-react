import React,{Component} from 'react'
import {connect} from 'react-redux'
import WebSocket from '../component/webSocket'

class Pane extends Component{
    constructor(){
        super()
        this.getWebSocket = this.getWebSocket.bind(this)
        this.state = {
            // msgList:[],
            onlineCount:0,
            msg:"",
            username:"",
            webSocket:null
        }
    }

    componentWillMount(){
        console.log("componentWillMount")
        this.setState({
            webSocket : this.getWebSocket()
        },function(){
            console.log(this.state.webSocket)
        })
    }

    // getWebSocket(){
    //     this.refs.getWebSocket.getWebSocket()
    // }

    inputOnChange(event){
        let name = event.target.name
        let value = event.target.value
        this.setState({
            [name]:value
        })

        // ,()=>{
        //     console.log("msg:" + this.state.msg)
        //     console.log("username:" + this.state.username)
        // })
    }

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
            this.setState({
                onlineCount : message.onlineCount
            })
        }
        webSocket.onclose = (event) => {
            console.log('webSocket关闭连接')
        }
        webSocket.onerror = (event) => {
            console.log('websocket发生异常')
        }
        return webSocket;
    }

    sendMsgToServer() {
        console.log("sendMsgToServer")
        // var webSocket = this.getWebSocket();
        // console.log(webSocket)
        // console.log("webSocket.readyState:" + webSocket.readyState)
        // console.log(this.state.webSocket)
        // var web = this.state.webSocket
        // console.log("webSocket.readyState:" + web.readyState)
        // web.addEventListener('open', ()=> {
        // // this.state.webSocket.addEventListener('open', ()=> {
        //     if(this.state.msg!==""){
        //         console.log("要发送消息啦")
        //         // console.log("消息是：" + this.state.msg)
        //         this.state.webSocket.send(JSON.stringify({
        //             username:this.state.username,
        //             msg:this.state.msg
        //         }))
        //     }else{
        //         alert("请输入")
        //     }   
        // });

        var webSocket = this.getWebSocket();
        console.log("webSocket.readyState:" + webSocket.readyState)
        webSocket.addEventListener('open', ()=> {
            if(this.state.msg!==""){
                console.log("要发送消息啦")
                this.state.webSocket.send(JSON.stringify({
                    username:this.state.username,
                    msg:this.state.msg
                }))
            }else{
                alert("请输入")
            }   
        });
    }

    render(){
        return(
            <div>this id pane
                <div>
                    username:<input name="username" onChange={(e)=>this.inputOnChange(e)}/>
                    msg:<input name="msg" onChange={(e)=>this.inputOnChange(e)}/>
                    <button onClick={()=>this.sendMsgToServer(this)}>发送</button> 
                    {/* msgList:
                    {
                        this.state.msgList.map(function(item){
                            return <h1>{item.msg}</h1>
                        })
                    } */}
                    onlineCount:{this.state.onlineCount}
                    {/* <WebSocket ref="getSocket"></WebSocket> */}
                </div>
            </div>
        )
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

export default connect(mapState,mapDispatch)(Pane);