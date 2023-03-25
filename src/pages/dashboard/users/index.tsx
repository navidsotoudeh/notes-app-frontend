//libraries
import React, { useState, useEffect } from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
//type
import { NextPage } from "next";
//component
import Table from "../../../components/Table";
//redux
import { useGetUsersQuery } from "../../../service/users/userApi";
const Users: NextPage = () => {
  //hooks
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  console.log("users", users);

  const columns = ["Id", "Name", "Roles"];

  const [rows, setRows] = useState(null);
  console.log("rows", rows);

  useEffect(() => {
    if (users && users?.length) {
      const newRows = users?.map((ele) => ({
        Id: ele._id,
        Name: ele.username,
        roles: ele.roles,
      }));
      setRows(newRows);
    }
    return function cleanup() {
      // Side-effect cleanup...
    };
  }, [users]);
  return (
    <div className="border border-gray-600 p-4 flex flex-col gap-4">
      <p> Welcome</p>
      <p className="text-5xl">List of users</p>
      <Link href="./users/new-user">Add a user</Link>
      {rows ? <Table rows={rows} columns={columns} /> : "isLoading"}
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
