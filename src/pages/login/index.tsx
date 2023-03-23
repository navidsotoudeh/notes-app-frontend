//libraries
import React from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
//type
import { NextPage } from "next";
import { FormValues } from "./FormInterface";

//component
import Button from "@/components/UIKit/Button";

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
    <div className="w-full justify-center items-center">
      please login
      <form
        className="grid w-full grid-cols-2 gap-6 rounded-[12px] p-4 pb-[120px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        ss
        <div className="col-span-2 flex w-full justify-center bg-red-500">
          <Button
            label="ثبت"
            size="large"
            onClick={handleSubmit((d) => onSubmit(d as FormValues))}
            // loading={isLoading}
          />
        </div>
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
