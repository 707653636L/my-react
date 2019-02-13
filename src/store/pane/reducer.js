const defaultState = {
    msgList:[]
}

export default function PaneReducer(state = defaultState,action){
    switch(action.type){
        case "updateMsg" :
            return {...state,...{msgList:action.data}}
        default:
            return state
    }
}