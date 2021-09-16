import { REGISTRATION } from '../actions/regAction'
import { LOG_OUT } from '../actions/logOut'

let initialState = {
    name: localStorage.getItem('userName'),
    sername: localStorage.getItem('userSername'),
    school: localStorage.getItem('userSchool'),
}

export const mainReducer = (state = initialState, action: any ) => {
    switch(action.type) {

        case REGISTRATION:
            return {
                ...state,
                name: action.payload[0],
                sername: action.payload[1],
                school: action.payload[2]
            }

        case LOG_OUT:
            return {
                ...state,
                name: '',
                sername: '',
                school: ''
            }
 
        default: 
            return state
    }
}