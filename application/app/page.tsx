"use client";

import Image from "next/image";
import { loginValue } from "./types";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { authSlice } from "./redux/Slices/auth_Slice";
import { useFormik } from "formik";

export default function Home() {
  const stateData = useAppSelector((state) => state.auth.authData.auth);
  // console.log("stateData", stateData);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      username : "",
      password : "",
    },
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = async (values: loginValue) => {
    console.log("values", values);

    const document : any  = {
      userName : values.username,
      password : values.password,
    }

    await dispatch(authSlice(document));

  };

  return (
    <div className=" w-[100%] h-[100vh] bg-slate-200 flex justify-center items-center ">
      <div className=" w-[500px] p-[10px] flex flex-col justify-center items-center shadow-sm shadow-black-500 bg-white rounded-[10px] ">
        <h2 className=" font-[800] uppercase text-[35px] ">Login</h2>
        <form
          onSubmit={formik.handleSubmit}
          className=" flex flex-col w-[100%] justify-center items-center"
        >
          <input
            type="text"
            name="username"
            id="username"
            className=" border-[1px] px-[10px] py-[5px] mt-[10px] border-black w-[100%] "
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          <input
            type="text"
            name="password"
            id="password"
            className=" border-[1px] py-[5px] px-[10px] my-[20px] border-black w-[100%] "
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <button type="submit" className=" w-[100%] bg-red-500">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
