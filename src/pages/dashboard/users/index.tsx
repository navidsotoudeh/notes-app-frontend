//libraries
import React from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
//type
import { NextPage } from "next";

//component
import Button from "@/components/UIKit/Button";
import Input from "@/components/UIKit/Input";
import Text from "@/components/UIKit/Text";

const Users: NextPage = () => {
  //hooks
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    reset,
  } = useForm();
  console.log("errors", errors);

  return (
    <div className="border border-gray-600 p-4 flex flex-col gap-4">
      <p> Welcome</p>
      <p className="text-5xl">List of users</p>
      <Link href="./users/new-user">Add a user</Link>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: {
      pageTitle: "Users",
      pageId: 3,
    },
  };
}

export default Users;
