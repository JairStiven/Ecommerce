import axios from "axios";
import { getToken } from "./authService";

export const createOrder = async (cart, metodoPago = "WhatsApp") => {
  const token = getToken();

  const response = await axios.post(
    "/api/orders/create",
    { cart, metodoPago },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};