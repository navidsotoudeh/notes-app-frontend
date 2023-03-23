const SkeletonProductRating_Desktop = () => {
  return (
    <>
      <div className="flex w-full gap-2">
        <div className="relative flex h-[90px] w-[90px] overflow-hidden rounded-full p-[10px] duration-300 group-hover:scale-110">
          <div className="loader-animations relative h-full w-full rounded-full bg-silver_grey"></div>
        </div>
        <div className="relative flex h-[90px] w-[90px] overflow-hidden rounded-full p-[10px] duration-300 group-hover:scale-110">
          <div className="loader-animations relative h-full w-full rounded-full bg-silver_grey"></div>
        </div>
      </div>
    </>
  )
}
export default SkeletonProductRating_Desktop
