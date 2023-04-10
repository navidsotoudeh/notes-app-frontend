//libraries
import React from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";

//type
import { NextPage } from "next";
import { FormValues } from "./FormInterface";

//RTK
import { useLoginUserMutation } from "../../service/auth/authApi";

const Login: NextPage = () => {
  //hooks
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const [login, { isLoading }] = useLoginUserMutation();

  const onSubmit: SubmitHandler<FormValues> = (userData) => {
    // dispatch(setContactForm(newContact));
    login(userData);
  };
  return (
    <form
      className="flex h-[400px] w-full flex-col items-center justify-center gap-2 bg-slate-200"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="flex w-[200px] justify-center rounded-2xl bg-purple-300 py-4">
        Login Form
      </p>
      <div className="flex flex-col">
        <input
          type="text"
          {...register("username", { required: true })}
          className="rounded-xl border border-gray-400 p-4 outline-0"
          placeholder="username"
        />
        {errors.username && (
          <span style={{ color: "red" }}>*username* is mandatory </span>
        )}
      </div>
      <div className="flex flex-col">
        <input
          type="text"
          {...register("password", { required: true })}
          className="rounded-xl border border-gray-400 p-4 outline-0"
          placeholder="password"
        />
        {errors.password && (
          <span style={{ color: "red" }}>*password* is mandatory </span>
        )}
      </div>
      <input
        type="submit"
        className="rounded-xl border border-gray-400 bg-cyan-400 p-4 outline-0"
      />
    </form>
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
