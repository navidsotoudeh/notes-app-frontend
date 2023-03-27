//libraries
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Select from "react-select";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { NextPage } from "next";
import { toast } from "react-toastify";

//type

//redux
import {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../../service/users/usersApi";

const UserInfoPage: NextPage = () => {
  //hooks
  const router = useRouter();
  const { userId } = router.query;

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.find((ele) => ele.id === userId),
    }),
  });
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<any>();
  const options = [
    { value: "Employee", label: "Employee" },
    { value: "Manager", label: "Manager" },
    { value: "Admin", label: "Admin" },
  ];
  useEffect(() => {
    if (user) {
      setValue("username", user.username ?? "");
      setValue("password", user.password ?? "");
      console.log(
        "AA",
        options.some((ele) => user?.roles.indexOf(ele.value) !== -1)
      );
      setValue(
        "roles",
        options.filter((ele) => user?.roles.indexOf(ele.value) !== -1) ?? []
      );
    }
  }, [user]);
  const onSubmit: SubmitHandler<any> = (data) => {
    const newData = {
      id: userId,
      username: data.username,
      roles: data.roles.map((e) => e.value),
      password: data.password,
      active: true,
    };
    updateUser(newData)
      .unwrap()
      .then(() => {
        toast.success("فرم با موفقیت تغییر یافت");
      })
      .catch(() => {
        toast.error("ارسال فرم ناموفق بود");
      });
  };
  return (
    <div className="flex flex-col gap-2 p-4 bg-orange-100 h-ful w-full">
      <div>Information of user</div>
      <form
        className="rounded-[12px] p-12 w-full bg-blue-200 p-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-6 flex items-center">
          <div className="w-1/3">
            <label
              className="pr-4 text-right font-bold text-black"
              htmlFor="username"
            >
              username
            </label>
          </div>
          <div className="w-2/3">
            <input
              className="w-full appearance-none rounded border-2 border-gray-400 bg-white py-2 px-4 leading-tight text-gray-700 focus:border-blue-500 focus:bg-white focus:outline-none"
              type="text"
              placeholder="username"
              {...register("username", { required: true })}
            />
            {errors.username && errors.username.type === "required" && (
              <span className="text-red-500">این فیلد الزامی است</span>
            )}
          </div>
        </div>
        <div className="mb-6 flex items-center">
          <div className="w-1/3">
            <label className="pr-4 font-bold text-black" htmlFor="password">
              password
            </label>
          </div>
          <div className="w-2/3">
            <input
              className="w-full rounded border-2 bg-white py-2 px-4 leading-tight text-gray-700 focus:border-blue-500 focus:outline-none"
              type="text"
              placeholder="password"
              {...register("password", { required: true })}
            />
            {errors.password && errors.password.type === "required" && (
              <span className="text-red-500">این فیلد الزامی است</span>
            )}
          </div>
        </div>
        <div className="mb-6 flex items-center">
          <div className="w-1/3">
            <label className="pr-4 font-bold text-black" htmlFor="password">
              password
            </label>
          </div>
          <div className="w-2/3">
            <Controller
              name="roles"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Select
                  isMulti
                  isClearable
                  options={options}
                  onChange={onChange}
                  value={value}
                  placeholder="roles"
                />
              )}
            />
          </div>
          {errors.roles && errors.roles.type === "required" && (
            <span className="text-red-500">این فیلد الزامی است</span>
          )}
        </div>
        <div className="col-span-2 flex w-full justify-center desktop:justify-end">
          <button
            onClick={handleSubmit((d) => onSubmit(d as FormValues))}
            className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInfoPage;
