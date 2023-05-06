interface IProps {
  isAuthenticated: boolean
}
export default function Home({ isAuthenticated }: IProps) {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world! This home page
    </h1>
  )
}
