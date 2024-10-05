import { Modal } from "@mui/material";
import React, { useState } from "react";
import { CiPlay1 } from "react-icons/ci";
import Backdrop from "@mui/material/Backdrop";

const VideoCard = ({ video }) => {
  const [open, setOpen] = useState(false); // state of modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="flex flex-col items-center w-72 ">
      <div onClick={handleOpen} className="relative cursor-pointer w-64 h-52">
        <img
          src={`https://img.youtube.com/vi/${video?.key}/0.jpg`}
          alt="video"
          className="w-full rounded-lg object-cover"
        />
        <div className="w-16 h-16 top-[50%] right-[50%] translate-x-[50%] -translate-y-[50%] flex justify-center items-center text-white rounded-full border absolute">
          <CiPlay1 size={30} />
        </div>
      </div>
      <h3 className="lg:text-base w-full px-2 text-left break-words whitespace-normal text-xs text-white">
        {video?.name}
      </h3>{" "}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${video?.key}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute w-[90%] h-72 lg:w-[800px] lg:h-[560px] top-[50%] right-[50%] translate-x-[50%] -translate-y-[50%]"
        ></iframe>
      </Modal>
    </div>
  );
};

export default VideoCard;
