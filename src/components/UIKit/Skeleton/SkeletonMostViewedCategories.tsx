const SkeletonMostViewedCategories = () => {
  return (
    <>
      <div className="relative flex h-[140px] w-[140px]  overflow-hidden rounded-full  p-[10px] duration-300  group-hover:scale-110">
        <div className="loader-animations relative h-full w-full rounded-full bg-silver_grey"></div>
      </div>
      <div className="loader-animations h-[40px] w-[120px] rounded-[10px] bg-silver_grey text-center text-[16px] font-bold"></div>
    </>
  )
}
export default SkeletonMostViewedCategories
