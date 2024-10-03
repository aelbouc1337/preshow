import { IoIosArrowUp } from "react-icons/io";

const BackToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      onClick={scrollToTop}
      className="fixed bottom-4 border-bg z-50 right-4 w-16 h-16 rounded-full border-2 text-slate-300 cursor-pointer hover:text-slate-400 bg-slate-100 flex justify-center items-center"
    >
      <IoIosArrowUp className="text-primary" size={30} />
    </div>
  );
};

export default BackToTop;
