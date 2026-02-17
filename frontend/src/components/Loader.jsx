import Lottie from "lottie-react";
import animationData from "../../public/Real Estate.json";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="w-80 h-80">
        <Lottie 
          animationData={animationData} 
          loop={true} 
          autoplay={true} 
        />
      </div>
    </div>
  );
};

export default Loader;
