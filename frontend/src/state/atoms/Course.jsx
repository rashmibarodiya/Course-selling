import {atom} from "recoil"


export const courseDetails = atom({
    key : 'courseDetails',
    default : null
})
 export const title = atom({
    key : 'title',
    default : ""
})
export const des = atom({
    key : 'desc',
    default : ""
})
export const img= atom({
    key : 'img',
    default : ""
})
export const price = atom({
    key : 'price',
    default : ""
})