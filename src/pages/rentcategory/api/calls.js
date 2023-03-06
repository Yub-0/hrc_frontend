import { CATEGORY, FLOOR } from ".";
import { createClient } from "src/plugins/axios";

export function postRentCategory(data){
    return createClient().post(CATEGORY, data)
}
export function getRentCategory(){
    return createClient().get(CATEGORY)
}
