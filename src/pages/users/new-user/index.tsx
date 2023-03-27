//libraries
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Select from "react-select";

//type
import { NextPage } from "next";
import { FormValues } from "./FormInterface";

//redux
import { useAddNewUserMutation } from "../../../service/users/usersApi";
import { toast } from "react-toastify";

const NewUser: NextPage = () => {
  //hooks
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm();
  const options = [
    { value: "Employee", label: "Employee" },
    { value: "Manager", label: "Manager" },
    { value: "Admin", label: "Admin" },
  ];
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const newData = {
      username: data.username,
      password: data.password,
      roles: ["Employee"],
    };
    addNewUser(newData)
      .unwrap()
      .then(() => {
        toast.success("user created");
      })
      .catch(() => {
        toast.error("There is a problem");
      });
  };

  return (
    <div className="border border-gray-600 p-4 flex flex-col gap-4">
      <p> create a new user</p>
      <div className="flex w-full flex-col justify-between bg-white">
        <form
          className="flex w-full flex-col gap-2 rounded-[12px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex w-[300px] flex-col gap-3">
            <div className="mb-6 flex-col flex">
              <label
                className="w-1/3 text-[14px] font-semibold text-[#505050]"
                htmlFor="username"
              >
                username
              </label>
              <input
                className="mt-[8px] w-full rounded-[10px] border border-[#E1E1E1] bg-white py-2 px-4 leading-tight text-gray-700 focus:border-blue-500 focus:outline-none"
                {...register("username", { required: true })}
              />
              {errors.username && errors.username.type === "required" && (
                <span className="text-red-500">username is required</span>
              )}
            </div>
            <div className="mb-6 flex-col flex">
              <label
                className="w-1/3 text-[14px] font-semibold text-[#505050]"
                htmlFor="password"
              >
                password
              </label>
              <input
                className="mt-[8px] w-full rounded-[10px] border border-[#E1E1E1] bg-white py-2 px-4 leading-tight text-gray-700 focus:border-blue-500 focus:outline-none"
                {...register("password", { required: true })}
              />
              {errors.password && errors.password.type === "required" && (
                <span className="text-red-500">password is required</span>
              )}
            </div>
            <div className="mt-[10px] w-full">
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable
                    options={options}
                    placeholder="select the role"
                  />
                )}
              />
              {errors.role && errors.role.type === "required" && (
                <span className="text-red-500">این فیلد الزامی است</span>
              )}
            </div>
          </div>
          <button
            className="mt-[5px] flex h-[35px] w-[75px] cursor-pointer items-center justify-center rounded-[8px] border bg-green-500 text-white"
            onClick={handleSubmit((d) => onSubmit(d as FormValues))}
          >
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: {
      pageTitle: "NewUser",
      pageId: 4,
    },
  };
}

export default NewUser;
