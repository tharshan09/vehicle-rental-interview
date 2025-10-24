import axios from "axios";

const API_BASE_URL = "http://localhost:8000";
const SECRET_KEY = "XYZ123SECRET";

export const api = {
  getCustomers: async () => {
    const res = await axios.get(`${API_BASE_URL}/customers?key=${SECRET_KEY}`);
    return res.data as any;
  },
  getVehicles: async () => {
    const res = await axios.get(API_BASE_URL + "/vehicles");
    return res.data;
  },
  getRentals: async () => {
    const res = await axios.get(API_BASE_URL + "/rentals");
    return res.data;
  },
  createRental: async (body: any) => {
    const res = await axios.post(API_BASE_URL + "/rentals", body);
    return res.data;
  },
  setVehicleMaintenance: async (id: any) => {
    const res = await axios.patch(
      API_BASE_URL + "/vehicles/" + id + "/maintenance"
    );
    return res.data;
  },
};
