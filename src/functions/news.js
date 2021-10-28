   
import axios from "axios";

export const removeNew = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/delete-new/${slug}`, {
    headers: {
      authtoken,
    },
});

export const updateNew = async (slug, neW, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/new/${slug}`, neW, {
    headers: {
      authtoken,
    },
});

export const createNew = async (id,neW, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/new/${id}`, neW, {
    headers: {
      authtoken,
    },
});

export const getNewsCount = async () =>
  await axios.get(`${process.env.REACT_APP_API}/news/total`);


export const getNew = async (slug) =>
    await axios.get(`${process.env.REACT_APP_API}/new/${slug}`);

export const getNews = async (sort,order,page) =>
    await axios.post(`${process.env.REACT_APP_API}/news`,{
      sort,
      order,
      page,
    });

export const getNewsList = async () =>
await axios.post(`${process.env.REACT_APP_API}/newsL`);
