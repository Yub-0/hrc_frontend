import { HOUSE } from ".";
import { createClient } from "src/plugins/axios";

export function postHouse(data){
    return createClient().post(HOUSE, data)
}
export function getHouse(){
    return createClient().get(HOUSE)
}
