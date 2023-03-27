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

const Dashboard: NextPage = () => {
  //hooks
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    reset,
  } = useForm();

  return (
    <div className="border border-gray-600 p-4 flex flex-col gap-4">
      <p> Welcome</p>
      <Link href="./">view tech notes</Link>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: {
      pageTitle: "Dashboard",
      pageId: 2,
    },
  };
}

export default Dashboard;
