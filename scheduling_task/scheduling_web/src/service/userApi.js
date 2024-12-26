import axios from "axios";

const URL = "http://localhost:8080";
export const loginUser = async (payload) => {
  try {
    const responce = await axios.post(
      `${URL}/admin/login`,
      payload
    );
    if (responce.data) {
      alert(responce.data.data.message);
      return responce.data.data;
    }
  } catch (error) {
    console.log("errr", error);
  }
};

export const registerUser = async (payload) => {
  try {
    const responce = await axios.post(
      `${URL}/admin/create-admin`,
      payload
    );
    if (responce.data) {
      alert(responce.data.message);
      return responce.data.data;
    }
  } catch (error) {
    console.log("errr", error);
  }
};
export const getUserData = async (payload) => {
    try {
      const responce = await axios.post(
        `${URL}/user/get`,
        payload
      );
      if (responce.data) {
        alert(responce.data.message);
        return responce.data.data;
      }
    } catch (error) {
      console.log("errr", error);
    }
  };
  export const createUser = async (payload) => {
    try {
      const responce = await axios.post(
        `${URL}/user/create-user`,
        payload
      );
      if (responce.data) {
        alert(responce.data.message);
        return responce.data.data;
      }
    } catch (error) {
      console.log("errr", error);
    }
  };

  export const createScheduleTask = async (payload) => {
    try {
      const responce = await axios.post(
        `${URL}/schedule/create`,
        payload
      );
      if (responce.data) {
        alert(responce.data.message);
        return responce.data.data;
      }
    } catch (error) {
      console.log("errr", error);
    }
  };
  