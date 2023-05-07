//libraries
import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
//type
import { NextPage } from 'next'
//component
import Table from '../../components/table'
//redux
import { useGetUsersQuery } from '@/service/users/usersApi'
const Users: NextPage = () => {
  //hooks
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error: usersError,
  } = useGetUsersQuery('usersList', {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  const [rows, setRows] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    if (users && users?.length) {
      const newRows = users?.map((ele) => ({
        Id: ele.id,
        Name: ele.username,
        Roles: ele.roles,
      }))
      setRows(newRows)
    }
    return function cleanup() {
      // Side-effect cleanup...
    }
  }, [users])
  const handleOnEdit = (row) => {
    setSelectedUser(row)
    Router.push(`/dashboard/users/${row.Id}`)
  }
  return (
    <div className="flex flex-col gap-4 border border-gray-600 p-4">
      <p> Welcome</p>
      <p className="text-5xl">List of users</p>
      <Link
        href="./users/new-user"
        className="flex w-[200px] justify-center rounded-2xl bg-green-100 px-4 py-2"
      >
        Add a user
      </Link>

      {isLoading ? (
        isLoading
      ) : rows ? (
        <Table
          rows={rows}
          columns={['Id', 'Name', 'Roles']}
          hasEdit={true}
          handleOnEdit={handleOnEdit}
        />
      ) : (
        `${usersError?.data?.message}`
      )}
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      pageTitle: 'Users',
      pageId: 3,
    },
  }
}

export default Users
