import { HOUSE, FLOOR } from ".";
import { createClient } from "src/plugins/axios";

export function postHouse(data) {
  return createClient().post(HOUSE, data);
}
export function getHouse() {
  return createClient().get(HOUSE);
}

export function getFloors(params = {}) {
  return createClient().get(FLOOR, { params });
}
