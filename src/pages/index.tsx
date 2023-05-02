import { useEffect, useLayoutEffect } from 'react'
import { getCookie } from 'cookies-next'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { wrapper } from '../store/store'
import { userLoggedOut } from '../store/slices/auth/authSlice'

interface IProps {
  isAuthenticated: boolean
}
export default function Home({ isAuthenticated }: IProps) {
  const dispatch = useDispatch()
  // @ts-ignore
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn)
  const router = useRouter()

  // useLayoutEffect(() => {
  //   // rome-ignore lint/complexity/useSimplifiedLogicExpression: <explanation>
  //   if (!isAuthenticated || !isLoggedIn) {
  //     dispatch(userLoggedOut())
  //     router.push('/login')
  //   }
  // }, [isAuthenticated, isLoggedIn])

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world! This home page
      </h1>
    </>
  )
}

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ req, res }) => {
//       // await store.dispatch(getRooms(req))
//       console.log('35--------')
//       const cookie = getCookie('notesapp-accessToken', { req, res })
//       console.log('37--', cookie)
//       if (!cookie)
//         return {
//           redirect: {
//             permanent: false,
//             source: '/',
//             destination: '/?fallback=/login/users',
//           },
//         }
//     }
// )

// export async function getServerSideProps(context: any) {
//     let shouldUpdateCookie = false;
//     const newToken = await getGuestToken(context);
//
//     const menuInstance = new HandleMenu();
//     const userInstance = new HandleUser();
//
//     try {
//         const userInstance = new HandleUser();
//         const user = await userInstance.getUser(newToken);
//     } catch (e) {
//         return {
//             redirect: {
//                 permanent: false,
//                 destination: '/?fallback=/profile/dashboard',
//             },
//         };
//     }
//
//     const menu = await menuInstance.getMega(newToken);
//     const user = await userInstance.getUser(newToken);
//     const orders = await userInstance.getOrders(newToken);
//
//     return {
//         props: {
//             metaData: { title: 'پروفایل کاربری' },
//             token: newToken,
//             user: user.data,
//             menu: menu.data,
//             orders: orders.data,
//         },
//     };
// }
