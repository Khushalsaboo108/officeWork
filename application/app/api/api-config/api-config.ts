"use server"
import axios, { AxiosResponse } from "axios";


export const POST = async <T>(api: string, data: any, headers: any = null) => {
    try {
      let response: AxiosResponse<T, any>;
      if (headers) {
        response = await axios.post<T>(api, data, {
          headers,
        });
      } else {
        response = await axios.post<T>(api, data);
      }
      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        console.error(response.data);
        return response.data
      }
    } catch (error) {
      console.error(error);
      return (error)
    }
    
  };

  export const _post = async <T>(api: string, data: any, headers: any = null) => {
    try {
      let response: AxiosResponse<T, any>;
      if (headers) {
        response = await appAxios.post<T>(api, data, {
          headers,
        });
      } else {
        response = await appAxios.post<T>(api, data);
      }
      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        throw new AppError(response.status, response.statusText, response.data);
      }
    } catch (error) {
      console.error("Error", error)
      // throw HandleError(error);
    }
  };