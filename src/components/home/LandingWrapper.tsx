"use client";
import { Button, Dialog, Slide } from "@mui/material";
import React, { useState } from "react";
import { CgBee } from "react-icons/cg";
import Instructions from "../modals/Instructions";
import { TransitionProps } from "@mui/material/transitions";
import { useTranslation } from "react-i18next";

type LandingProps = {
  open: boolean;
  setOpen: Function;
};

const LandingWrapper = ({ open, setOpen }: LandingProps) => {
  const { t, i18n } = useTranslation();
  const [instructionsModal, setInstructionsModal] = useState(false);
  const openInstructionsModal = () => {
    setInstructionsModal(true);
  };

  const onPlay = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      TransitionProps={{
        appear: false,
      }}
      keepMounted
      fullScreen
      aria-describedby="alert-dialog-slide-description"
    >
      <div className="h-screen bg-[#F7DA21]">
        <div className="flex flex-col justify-center items-center h-full">
          <div className="container w-auto flex flex-col gap-4 text-black items-center mx-6 sm:mx-auto">
            <CgBee className="text-7xl " />
            <h1 className="text-4xl font-bold text-center">
              {t("landing.title")}
            </h1>
            <p className="text-xl">{t("landing.desc")}</p>
            <div className="actions flex gap-4 mt-3">
              <Button
                variant="outlined"
                className="text-lg text-black font-bold"
                onClick={onPlay}
              >
                {t("landing.play")}
              </Button>
              <Button
                onClick={openInstructionsModal}
                variant="outlined"
                className="text-lg text-black font-bold"
              >
                {t("landing.howTo")}
              </Button>
            </div>
          </div>
        </div>
        <Instructions open={instructionsModal} setOpen={setInstructionsModal} />
      </div>
    </Dialog>
  );
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default LandingWrapper;
