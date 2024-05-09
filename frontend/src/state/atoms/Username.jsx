import {atom} from "recoil"


export const userName = atom({
    key : 'userState',
    default : null
})
 export const userRole = atom({
    key : 'userRole',
    default : ""
})