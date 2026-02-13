import Image from "next/image";
const ImageSkeleton = () => {
  return (
    <div
      role="status"
      className="flex relative items-center justify-center w-full h-full bg-border-nav rounded-base animate-pulse"
    >
      <div className="absolute w-full h-full inset-0 overflow-hidden flex justify-center items-center z-0 opacity-45">
        <div className="relative sm:w-[264px] w-[150px] sm:h-[80px] h-[50px]">
          <Image
            fill
            src={"/assets/icons/logo.svg"}
            alt={"cover image"}
            className="object-fill"
          />
        </div>
      </div>
     
    </div>
  );
};

export default ImageSkeleton;