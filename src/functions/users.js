   
import axios from "axios";


export const getUser = async (id) =>
    await axios.get(`${process.env.REACT_APP_API}/user/${id}`);

export const getUsers = async (authtoken) =>
    await axios.post(`${process.env.REACT_APP_API}/users`, '', {
        headers: {
          authtoken,
        },
});

export const updateUserProperty = async (id, propertyId,authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/user-property/${id}`, propertyId, {
    headers:{
      authtoken,
    },
  });

