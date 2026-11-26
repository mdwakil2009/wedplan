
export default function FeaturedServicesSkeleton() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-12">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading Skeleton */}
        <div className="mb-9 text-center sm:mb-11">
          <div className="mx-auto mb-4 h-3 w-44 animate-pulse bg-[#F0F0F0]" />

          <div className="mx-auto h-9 w-72 max-w-full animate-pulse bg-[#EEEEEE] sm:h-11 sm:w-96" />

          <div className="mx-auto mt-3 h-3 w-80 max-w-full animate-pulse bg-[#F3F3F3]" />

          <div className="mx-auto mt-6 h-px w-20 bg-[#EEEEEE]" />
        </div>

        {/* Featured Service Skeletons */}
        <div className="space-y-9 md:space-y-12">
          {[1, 2, 3].map((item, index) => (
            <div
              key={item}
              className="grid grid-cols-1 items-center gap-5 md:grid-cols-2 md:gap-9 lg:gap-12"
            >
              {/* Image */}
              <div
                className={`relative aspect-[16/10] animate-pulse bg-[#F1F1F1] sm:aspect-[5/3] md:aspect-[4/3] ${
                  index % 2 !== 0 ? "md:order-1" : "md:order-2"
                }`}
              >
                <div className="absolute bottom-3 left-3 size-9 bg-white" />
                <div className="absolute right-3 top-3 size-8 rounded-full bg-white" />
              </div>

              {/* Service Content */}
              <div
                className={`flex flex-col justify-center py-1 ${
                  index % 2 !== 0 ? "md:order-2" : "md:order-1"
                }`}
              >
                {/* Category */}
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-px w-6 bg-[#EAEAEA]" />
                  <div className="h-2.5 w-28 animate-pulse bg-[#F0F0F0]" />
                </div>

                {/* Title */}
                <div className="h-8 w-3/4 animate-pulse bg-[#EEEEEE] sm:h-9" />

                {/* Description */}
                <div className="mt-3 space-y-2">
                  <div className="h-3 w-full animate-pulse bg-[#F3F3F3]" />
                  <div className="h-3 w-5/6 animate-pulse bg-[#F3F3F3]" />
                  <div className="h-3 w-2/3 animate-pulse bg-[#F3F3F3]" />
                </div>

                {/* Location */}
                <div className="mt-4 h-3 w-28 animate-pulse bg-[#F0F0F0]" />

                {/* Vendor Information */}
                <div className="mt-4 flex items-center gap-3 border-y border-[#EEEEEE] py-3">
                  <div className="size-10 shrink-0 animate-pulse rounded-full bg-[#EEEEEE]" />

                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="h-2 w-24 animate-pulse bg-[#F0F0F0]" />
                    <div className="h-3 w-36 max-w-full animate-pulse bg-[#EEEEEE]" />
                    <div className="h-2.5 w-44 max-w-full animate-pulse bg-[#F3F3F3]" />
                  </div>
                </div>

                {/* Price and Button */}
                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="space-y-2">
                    <div className="h-2 w-20 animate-pulse bg-[#F0F0F0]" />
                    <div className="h-7 w-28 animate-pulse bg-[#EEEEEE]" />
                  </div>

                  <div className="h-5 w-28 animate-pulse bg-[#F0F0F0]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Explore Button Skeleton */}
        <div className="mt-12 flex justify-center sm:mt-16">
          <div className="h-11 w-56 animate-pulse border border-[#EEEEEE] bg-white" />
        </div>

      </div>
    </section>
  );
}
