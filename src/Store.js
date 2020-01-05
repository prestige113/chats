import React from 'react'
import io from 'socket.io-client'

export const CTX = React.createContext();


function reducer(state, action) {
    const {from, msg, topic} = action.payload;
    switch (action.type) {
        case 'RECIEVE_MESSAGE':
            return {
                ...state,
                [topic]: [
                    ...state[topic],
                    {
                        from,
                        msg
                    }
                ]
            };
        default:
            return state
    }

}

const initState = {

    general: [
        {
            from: 'user',
            msg: 'hi',
            topic: 'general'
        }, {
            from: 'user',
            msg: 'hi',
            topic: 'general'
        }, {
            from: 'user',
            msg: 'hi',
            topic: 'general'
        }
    ],
    topic2: [
        {
            from: 'user',
            msg: 'hi',
            topic: 'general'
        }, {
            from: 'user',
            msg: 'hi',
            topic: 'general'
        }, {
            from: 'user',
            msg: 'hi',
            topic: 'general'
        }
    ]
};
let socket;

function sendChatAction(value) {
    socket.emit('chat message', value)
}

export default function Store(props) {

    const [allChats, dispatch] = React.useReducer(reducer, initState);

    if (!socket) {
        socket = io(":3001");
        socket.on('chat message', function (msg) {
            dispatch({type: 'RECIEVE_MESSAGE', payload: msg})
        })
    }

    const user = 'Aldar' + Math.random(100).toFixed(2)
    return (
        <CTX.Provider value={{allChats, sendChatAction, user}}>
            {props.children}
        </CTX.Provider>
    )

}