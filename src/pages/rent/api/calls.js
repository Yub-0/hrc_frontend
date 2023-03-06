import { CATEGORY, PAYMENT, ROOM } from ".";
import { createClient } from "src/plugins/axios";

export function postHouse(data){
    return createClient().post(HOUSE, data)
}
export function getRentCategory(){
    return createClient().get(CATEGORY)
}


export function getRentRoom(){
    return createClient().get(ROOM)
}

export function postRent(data){
    return createClient().post(PAYMENT, data)
}
export function getRent(params = {}){
    return createClient().get(PAYMENT, {params})
}