import { DASHBOARD } from ".";
import { createClient } from "src/plugins/axios";

export function getDashboard(params = {}) {
  return createClient().get(DASHBOARD, { params });
}
