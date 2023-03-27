//libraries
import React from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
//type
import { NextPage } from "next";
import { FormValues } from "./FormInterface";

//component
import Button from "@/components/UIKit/Button";
import Input from "@/components/UIKit/Input";
import Text from "@/components/UIKit/Text";

const Login: NextPage = () => {
  //hooks
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit: SubmitHandler<FormValues> = (newContact) => {
    // dispatch(setContactForm(newContact));
  };
  return (
    <div className="border border-gray-600 p-4">
      <p className="bg-purple-300 w-[200px] py-4 rounded-2xl flex justify-center">
        Registration Form
      </p>

      <form
        className="bg-white w-full flex items-center justify-center gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        {" "}
        <div className="flex flex-col">
          <input
            type="text"
            {...register("firstname", { required: true })}
            className="border border-gray-400 p-4 outline-0 rounded-xl"
            placeholder="firstname"
          />
          {errors.firstname && (
            <span style={{ color: "red" }}>*firstname* is mandatory </span>
          )}
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            {...register("lastname", { required: true })}
            className="border border-gray-400 p-4 outline-0 rounded-xl"
            placeholder="lastname"
          />
          {errors.lastname && (
            <span style={{ color: "red" }}>*lastname* is mandatory </span>
          )}
        </div>
        <div className="flex flex-col">
          <input
            type="email"
            {...register("email", { required: true })}
            className="border border-gray-400 p-4 outline-0 rounded-xl"
          />
          {errors.email && (
            <span style={{ color: "red" }}>*email* is mandatory </span>
          )}
        </div>
        <input
          type="submit"
          className="border border-gray-400 p-4 outline-0 rounded-xl bg-cyan-400"
        />
      </form>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: {
      pageTitle: "Login",
      pageId: 1,
    },
  };
}

export default Login;
