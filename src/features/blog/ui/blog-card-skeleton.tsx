export const BlogCardSkeleton = () => {
  return (
    <section className="w-90 mx-auto bg-neutral-200 rounded-lg animate-pulse">

      <div className="h-[50px] px-2 flex items-center gap-2">

        <div className="size-8 rounded-full bg-neutral-300"></div>

        <div className="flex flex-col gap-1">
          <span className="w-20 rounded h-[8px] bg-neutral-300"></span>
          <span className="w-30 rounded h-[8px] bg-neutral-300"></span>
        </div>

      </div>

      <div className="w-full h-[350px] bg-neutral-300"></div>

      <div className="w-full flex flex-col gap-3 px-4 pt-2 pb-3.5">

        <div className="flex gap-2">
          <div className="w-15 h-6 bg-neutral-300 rounded-full"></div>
          <div className="w-18 h-6 bg-neutral-300 rounded-full"></div>
          <div className="w-12 h-6 bg-neutral-300 rounded-full"></div>
        </div>

        <div className="w-2/4 h-3 bg-neutral-300 rounded-xl"></div>
        <div className="w-3/4 h-3 bg-neutral-300 rounded-xl"></div>

        <div className="flex gap-3 my-2">
          <div className="w-12 h-5 bg-neutral-300 rounded"></div>
          <div className="w-12 h-5 bg-neutral-300 rounded"></div>
          <div className="w-12 h-5 bg-neutral-300 rounded"></div>
        </div>

      </div>

    </section>
  )
}
