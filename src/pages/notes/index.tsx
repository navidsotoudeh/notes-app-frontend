//libraries
import React, { useState, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";
//type
import { NextPage } from "next";
//component
import Table from "../../components/table";
//redux
import { useGetNotesQuery } from "../../service/notes/notesApi";
const Notes: NextPage = () => {
  //hooks
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery("notesList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  console.log("users", users);
  const [rows, setRows] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  console.log("selectedUser", selectedUser);
  useEffect(() => {
    if (users && users?.length) {
      const newRows = users?.map((ele) => ({
        Id: ele._id,
        Name: ele.username,
        Roles: ele.roles,
      }));
      setRows(newRows);
    }
    return function cleanup() {
      // Side-effect cleanup...
    };
  }, [users]);
  const handleOnEdit = (row) => {
    setSelectedUser(row);
    console.log("row", row);
    Router.push(`/dashboard/users/${row.Id}`);
  };
  return (
    <div className="border border-gray-600 p-4 flex flex-col gap-4">
      <p> Welcome</p>
      <p className="text-5xl">List of Notes</p>
      <Link
        href="./notes/new-note"
        className="py-2 px-4 bg-green-100 rounded-2xl w-[200px] flex justify-center"
      >
        Add a note
      </Link>
      {rows ? (
        <Table
          rows={rows}
          columns={["Id", "Name", "Roles"]}
          hasEdit={true}
          handleOnEdit={handleOnEdit}
        />
      ) : (
        "isLoading"
      )}
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: {
      pageTitle: "Notes",
      pageId: 4,
    },
  };
}

export default Notes;
