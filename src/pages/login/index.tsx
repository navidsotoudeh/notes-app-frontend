//libraries
import React from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
//type
import { NextPage } from "next";
import { FormValues } from "./FormInterface";

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
    console.log("aa");
  };
  return (
    <div className="w-full bg-yellow-200 justify-center items-center">
      please login
      {/*<form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">*/}
      {/*  <input defaultValue="firstName" {...register("firstName")} />*/}
      {/*  <input {...register("lastName", { required: true })} />*/}
      {/*  {errors.lastName && <span>lastName is required</span>}*/}
      {/*  <input type="submit" />*/}
      {/*</form>*/}
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
