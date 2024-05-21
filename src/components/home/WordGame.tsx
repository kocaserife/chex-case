"use client";
import { Alert, Button, TextField } from "@mui/material";
import clsx from "clsx";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import BackspaceIcon from "@mui/icons-material/Backspace";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import { useTranslation } from "react-i18next";
import LanguageChanger from "../LanguageChanger";
import axios from "axios";

const letters = ["A", "E", "L", "N", "P", "R", "S"];

const initialGame = {
  status: "playing",
  score: 0,
  foundWords: [],
};

const WordGame = () => {
  const { t, i18n } = useTranslation();
  const [input, setInput] = useState("");
  const [shake, setShake] = useState(false);
  const [magnify, setMagnify] = useState(false);
  const [game, setGame] = useState<{
    status: string;
    score: number;
    foundWords: string[];
  }>(initialGame);
  const [seconds, setSeconds] = useState(60);

  const onType: ChangeEventHandler = (event: any) => {
    const value = event.target.value;
    if (value.length > 7) return;
    if (
      value
        .split("")
        .every((letter: string) => letters.includes(letter.toUpperCase()))
    )
      setInput(value);
  };

  const onLetterClick = (letter: string) => {
    if (input.length === 7 || game.status === "stopped") return;
    setInput((prevState) => prevState + letter);
  };

  const onBackspace = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
  };

  const onClear = () => {
    setInput("");
  };

  const onEnter = async () => {
    if (
      game.foundWords.some((item) => item.toLowerCase() == input.toLowerCase())
    )
      return triggerShake();

    const res = await axios.post("/api/check-word", {
      language: i18n.language,
      word: input,
    });
    if (res.data?.success) {
      setGame((prevState) => ({
        ...prevState,
        score: prevState.score + res?.data?.length,
        foundWords: [...prevState.foundWords, input],
      }));
      setSeconds((prevState) => prevState + 15);
      triggerMagnify();
    } else triggerShake();
  };

  useEffect(() => {
    let intervalId: any;
    if (seconds > 0) {
      intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    } else {
      setGame((prevState) => ({ ...prevState, status: "stopped" }));
      triggerShake();
    }

    return () => clearInterval(intervalId);
  }, [seconds]);

  const resetGame = () => {
    setGame(initialGame);
    setSeconds(60);
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => {
      setInput("");
      setShake(false);
    }, 500);
  };

  const triggerMagnify = () => {
    setMagnify(true);
    setTimeout(() => {
      setInput("");
      setMagnify(false);
    }, 500);
  };

  return (
    <div className="flex flex-col justify-center">
      <LanguageChanger />
      <div
        onClick={onBackspace}
        color="secondary"
        className={clsx("flex justify-between  w-full p-2 px-2 rounded-b", {
          "bg-secondary text-[black]": game.status === "playing",
          "bg-primary text-[white]": game.status === "stopped",
        })}
      >
        <span className="text-lg uppercase">
          {t("game.score")}:{" "}
          <span className="font-bold">{game?.score ?? 0}</span>
        </span>
        <span className="text-lg uppercase">
          {t("game.time")}: <span className="font-bold">{seconds ?? 0}</span>
        </span>
      </div>
      <TextField
        variant="standard"
        color="primary"
        focused
        value={input}
        onChange={onType}
        className={clsx("my-10 mx-auto", { shake })}
        disabled={game.status === "stopped"}
        InputProps={{
          inputProps: {
            className: clsx(
              "uppercase text-3xl font-bold tracking-wide w-[150px]",
              { drop: shake, magnify }
            ),
            maxLength: 7,
          },
        }}
      />
      <ul id="hexGrid" className="">
        {letters.map((letter, i) => (
          <li
            onClick={() => onLetterClick(letter)}
            key={uuid()}
            className="hex text"
          >
            <div className="hexIn">
              <a className={clsx("hexLink", { "center-letter": i === 3 })}>
                <p>{letter}</p>
              </a>
            </div>
          </li>
        ))}
      </ul>
      <div className="actions flex gap-4">
        <Button
          onClick={onBackspace}
          variant="contained"
          endIcon={<BackspaceIcon />}
          disabled={game.status === "stopped"}
        >
          {t("game.backspace")}
        </Button>

        <Button
          onClick={onClear}
          variant="contained"
          endIcon={<DeleteIcon />}
          disabled={game.status === "stopped"}
        >
          {t("game.clear")}
        </Button>

        <Button
          onClick={onEnter}
          variant="contained"
          color={shake ? "error" : magnify ? "success" : "secondary"}
          endIcon={<CheckIcon />}
          disabled={game.status === "stopped"}
        >
          {t("game.enter")}
        </Button>
      </div>
      {game.status === "stopped" && (
        <>
          <Alert className="my-2" icon={false} severity="info">
            {t("game.game_result", { score: game.score })}
          </Alert>
          <Button onClick={resetGame} variant="contained" color={"secondary"}>
            {t("game.play_again")}
          </Button>
        </>
      )}
    </div>
  );
};

export default WordGame;
