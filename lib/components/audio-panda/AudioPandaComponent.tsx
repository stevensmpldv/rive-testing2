import { useState, useEffect } from "react";
import { useRive, Layout, Fit } from "rive-react";

export default function App() {
  const [idleButtonText, setidleButtonText] = useState("Start idle");
  const [successButtonText, setsuccessButtonText] = useState("Start success");
    const [wiperButtonText, setWiperButtonText] = useState("Start blink");

  // animation will show the first frame but not start playing
  const { rive, RiveComponent } = useRive({
    src: "audio_panda_teddy_03.riv",
    artboard: "Panda Teddy",
    layout: new Layout({ fit: Fit.Contain }),
  });



  useEffect(() => {
    if (rive) {
      // Listen for play events to update button text
      rive.on("play", (event) => {
        const names = event.data;
        names.forEach((name) => {
          if (name === "idle") {
            setidleButtonText("Stop idle");
          } else if (name === "success") {
            setsuccessButtonText("Stop success");
          } else if (name === "blink"){
            setblinkButtonText("Stop blink")
          }
        });
      });

      // Listen for pause events to update button text
      rive.on("pause", (event) => {
        const names = event.data;
        names.forEach((name) => {
          if (name === "idle") {
            setidleButtonText("Start idle");
          } else if (name === "success") {
            setsuccessButtonText("Start success");
          } else if (name === "blink") {
            setblinkButtonText("Start blink");
        });
      });
    }
  }, [rive]);

  function onStartidleClick() {
    if (rive) {
      if (rive.playingAnimationNames.includes("idle")) {
        rive.pause("idle");
      } else {
        rive.play("idle");
      }
    }
  }

  function onStartsuccessClick() {
    if (rive) {
      if (rive.playingAnimationNames.includes("success")) {
        rive.pause("success");
      } else {
        rive.play("success");
      }
    }
  }
  function onStartblinkClick() {
    if (rive) {
      if (rive.playingAnimationNames.includes("blink")) {
        rive.pause("blink");
      } else {
        rive.play("blink");
      }
    }
  }

  return (
    <>
      <div>
        <RiveComponent style={{ height: "1000px" }} />
      </div>
      <div>
        <button id="idle" onClick={onStartidleClick}>
          {idleButtonText}
        </button>
        <button id="success" onClick={onStartsuccessClick}>
          {successButtonText}
        </button>
        <button id="blink" onClick={onStartblinkClick}>
          {blinkButtonText}
        </button>
      </div>
    </>
  );
}
