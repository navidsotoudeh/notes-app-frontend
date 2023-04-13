//libraries
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

//type
import { NextPage } from 'next'
import { FormValues } from './FormInterface'

import usePersist from '../../hooks/usePersist'

//RTK
import { useLoginUserMutation } from '../../service/auth/authApi'
import { userLoggedIn } from '../../store/slices/auth/authSlice'

const Login: NextPage = () => {
  //instances
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginUserMutation()
  const [persist, setPersist] = usePersist()
  const handleToggle = () => setPersist((prev: any) => !prev)

  const onSubmit: SubmitHandler<FormValues> = (userData) => {
    login(userData)
      .unwrap()
      .then((res) => {
        const accessToken = res.accessToken
        console.log('accessToken', accessToken)
        dispatch(userLoggedIn(accessToken))
        reset()
        toast.success('login sussefully')
      })
      .catch((err) => {
        if (!err.status) {
          toast.error('No Server Response')
        } else if (err.status === 400) {
          toast.error('Missing Username or Password')
        } else if (err.status === 401) {
          toast.error('Unauthorized')
        } else {
          toast.error(err.data?.message)
        }
      })
  }
  return (
    <form
      className="flex h-[400px] w-full flex-col items-center justify-center gap-2 bg-slate-200"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="flex w-[200px] justify-center rounded-2xl bg-purple-300 py-4">
        Login Form
      </p>
      <div className="flex flex-col">
        <input
          type="text"
          {...register('username', { required: true })}
          className="rounded-xl border border-gray-400 p-4 outline-0"
          placeholder="username"
        />
        {errors.username && (
          <span style={{ color: 'red' }}>*username* is mandatory </span>
        )}
      </div>
      <div className="flex flex-col">
        <input
          type="text"
          {...register('password', { required: true })}
          className="rounded-xl border border-gray-400 p-4 outline-0"
          placeholder="password"
        />
        {errors.password && (
          <span style={{ color: 'red' }}>*password* is mandatory </span>
        )}
      </div>
      <input
        type="submit"
        className="rounded-xl border border-gray-400 bg-cyan-400 p-4 outline-0"
      />
      <label htmlFor="persist" className="flex items-end gap-4 leading-none">
        <input
          type="checkbox"
          id="persist"
          className="h-4 w-4"
          onChange={handleToggle}
          checked={persist}
        />
        Trust This Device
      </label>
    </form>
  )
}

export async function getStaticProps() {
  return {
    props: {
      pageTitle: 'Login',
      pageId: 1,
    },
  }
}

export default Login
