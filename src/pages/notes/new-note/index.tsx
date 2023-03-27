//libraries
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";

//type
import { NextPage } from "next";
import { FormValues } from "./FormInterface";

//redux
import { useAddNewNoteMutation } from "../../../../service/notes/notesApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectAllUsers } from "@/store/slices/users/usersSlice";

const NewNote: NextPage = () => {
  //hooks
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm();
  //selectors
  const allUsers = useAppSelector(selectAllUsers);
  console.log("allUsers", allUsers);
  const options = [
    { value: "Employee", label: "Employee" },
    { value: "Manager", label: "Manager" },
    { value: "Admin", label: "Admin" },
  ];
  const [addNewNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const newData = {
      userId: 2,
      title: data.title,
      text: data.text,
    };
    console.log("data", data);
    console.log("newData", newData);
    addNewNote(newData)
      .unwrap()
      .then(() => {
        toast.success("user created");
      })
      .catch(() => {
        toast.error("There is a problem");
      });
  };

  return (
    <div className="border border-gray-600 p-4 flex flex-col gap-4 w-full">
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
                htmlFor="title"
              >
                Title:
              </label>
              <input
                className="mt-[8px] w-full rounded-[10px] border border-[#E1E1E1] bg-white py-2 px-4 leading-tight text-gray-700 focus:border-blue-500 focus:outline-none"
                {...register("title", { required: true })}
              />
              {errors.title && errors.title.type === "required" && (
                <span className="text-red-500">title is required</span>
              )}
            </div>
            <div className="mb-6 flex-col flex">
              <label
                className="w-1/3 text-[14px] font-semibold text-[#505050]"
                htmlFor="text"
              >
                Text
              </label>
              <textarea
                className="mt-[8px] w-full rounded-[10px] border border-[#E1E1E1] bg-white py-2 px-4 leading-tight text-gray-700 focus:border-blue-500 focus:outline-none"
                {...register("text", { required: true })}
              />
              {errors.text && errors.text.type === "required" && (
                <span className="text-red-500">text is required</span>
              )}
            </div>
            <div className="mt-[10px] w-full">
              <label
                className="w-1/3 text-[14px] font-semibold text-[#505050]"
                htmlFor="text"
              >
                ASSIGNED TO:
              </label>
              <Controller
                name="username"
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
              {errors.username && errors.username.type === "required" && (
                <span className="text-red-500">username is required</span>
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
      pageTitle: "NewNote",
      pageId: 5,
    },
  };
}

export default NewNote;
