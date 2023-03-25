//libraries
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Select from "react-select";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { NextPage } from "next";

//type

//redux
import { useGetUsersQuery } from "../../../service/users/userApi";

const UserInfoPage: NextPage = ({ userId }) => {
  //hooks
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.find((ele) => ele.id === userId),
    }),
  });
  console.log("user", user);
  const router = useRouter();

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
      setValue("id", user.id ?? null);
      setValue("username", user.username ?? "");
      setValue("password", user.password ?? "");
      setValue(
        "roles",
        options.find((ele) => ele.value === user.roles[0]) ?? ""
      );
    }
  }, [user]);
  const onSubmit: SubmitHandler<any> = (data) => {
    console.log("data", data);
    // callPutUpdatedColorApi({
    //   data: newData,
    // })!
    //   .then(() => {
    //     toast.success("فرم با موفقیت تغییر یافت");
    //     callGetColorApi({
    //       params: {
    //         id: draftId,
    //       },
    //     });
    //     navigate("/catalog/colors");
    //   })
    //   .catch(() => {
    //     toast.error("ارسال فرم ناموفق بود");
    //   });
  };
  return (
    <>
      <div>Information of user</div>
      <p>{`username:${user?.username}`}</p>
      <form className="rounded-[12px] p-12" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6 flex items-center">
          <div className="w-1/3">
            <label
              className="pr-4 text-right font-bold text-black"
              htmlFor="username"
            >
              username
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="w-full appearance-none rounded border-2 border-gray-400 bg-white py-2 px-4 leading-tight text-gray-700 focus:border-blue-500 focus:bg-white focus:outline-none"
              type="text"
              placeholder="نام فارسی"
              {...register("username", { required: true })}
            />
            {errors.username && errors.username.type === "required" && (
              <span className="text-red-500">این فیلد الزامی است</span>
            )}
          </div>
        </div>
        <div className="mb-6 md:flex md:items-center">
          <div className="md:w-1/3">
            <label className="pr-4 font-bold text-black" htmlFor="password">
              password
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="w-full rounded border-2 border-gray-400 bg-white py-2 px-4 leading-tight text-gray-700 focus:border-blue-500 focus:outline-none"
              type="text"
              placeholder="password"
              {...register("password", { required: true })}
            />
            {errors.password && errors.password.type === "required" && (
              <span className="text-red-500">این فیلد الزامی است</span>
            )}
          </div>
        </div>
        <div className="w-full">
          <Controller
            name="roles"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Select
                isClearable
                options={options}
                value={value}
                placeholder="roles"
              />
            )}
          />
          {errors.roles && errors.roles.type === "required" && (
            <span className="text-red-500">این فیلد الزامی است</span>
          )}
        </div>
      </form>
    </>
  );
};

export default UserInfoPage;
