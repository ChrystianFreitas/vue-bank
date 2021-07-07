import {createApp} from 'vue'
import {createStore} from 'vuex'
import axios from "axios";
import App from "@/App";

const store = createStore({
    state:{
        user: null,
    },
    mutations:{
        SET_USER(state, payload){
            state.user = payload
        }
    },
    actions:{
        action_openMessageModal(payload) {
            const msg = {
                show: true,
                styleMessage: payload.styleMessage,
                title: payload.title,
                message: payload.message,
            };
            if (payload.title === undefined && payload.message === undefined) {
                msg.title = 'Ocorreu um erro!';
                msg.message = 'Verifique a sua conexão com a internet e tente novamente mais tarde.';
            } else if ((payload.message === undefined || payload.message === null) && payload.title !== undefined) {
                msg.title = 'Atenção !';
                msg.message = title;
            }
            alert(msg)
        },
        async action_login(payload){
            return await axios.post('/login', payload)
                .then(response => {
                    return response
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
})

const app = createApp({
    App
})

app.use(store)