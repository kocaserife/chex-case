"use client";
import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import { useTranslation } from "react-i18next";

type InstructionsProps = {
  open: boolean;
  setOpen: Function;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Instructions = ({ open, setOpen }: InstructionsProps) => {
  const { t } = useTranslation();
  const handleClose = () => {
    setOpen(false);
  };

  const steps = [
    {
      label: t("instructions.step1_label"),
      description: t("instructions.step1_desc"),
    },
    {
      label: t("instructions.step2_label"),
      description: t("instructions.step2_desc"),
    },
    {
      label: t("instructions.step3_label"),
      description: t("instructions.step3_desc"),
    },
  ];
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{t("instructions.title")}</DialogTitle>
        <DialogContent>
          <Stepper activeStep={-1} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel>{step.label}</StepLabel>
                <DialogContentText>{step.description}</DialogContentText>
              </Step>
            ))}
          </Stepper>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Instructions;
