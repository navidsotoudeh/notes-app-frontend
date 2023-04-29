//libraries
import eact, { useState, useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
//type
import { NextPage } from 'next'
//component
import Table from '../../components/table'
//redux
import { useGetNotesQuery } from '../../service/notes/notesApi'
const Notes: NextPage = () => {
  //hooks
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery('notesList', {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })
  const [rows, setRows] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    if (notes && notes?.length) {
      const newRows = notes?.map((ele) => ({
        Id: ele._id,
        Name: ele.username,
        Roles: ele.roles,
        Title: ele.title,
        Text: ele.text,
      }))
      setRows(newRows)
    }
    return function cleanup() {
      // Side-effect cleanup...
    }
  }, [notes])
  const handleOnEdit = (row) => {
    setSelectedUser(row)
    Router.push(`/dashboard/notes/${row.Id}`)
  }
  return (
    <div className="flex w-full flex-col gap-4 border border-gray-600 bg-yellow-200 p-4">
      <p> Welcome</p>
      <p className="text-5xl">List of Notes</p>
      <Link
        href="./notes/new-note"
        className="flex w-[200px] justify-center rounded-2xl bg-green-100 px-4 py-2"
      >
        Add a note
      </Link>
      {rows ? (
        <Table
          rows={rows}
          columns={['Id', 'Name', 'Roles', 'Title', 'Text']}
          hasEdit={true}
          handleOnEdit={handleOnEdit}
        />
      ) : (
        'isLoading'
      )}
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      pageTitle: 'Notes',
      pageId: 4,
    },
  }
}

export default Notes
