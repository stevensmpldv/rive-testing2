import { useState, useEffect } from "react";
import { useRive, Layout, Fit } from "rive-react";

export default function App() {
  const [truckButtonText, setTruckButtonText] = useState("Start Truck");
  const [wiperButtonText, setWiperButtonText] = useState("Start Wipers");

  // animation will show the first frame but not start playing
  const { rive, RiveComponent } = useRive({
    src: "audio_panda_teddy_02.riv",
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
            setTruckButtonText("Stop Truck");
          } else if (name === "success") {
            setWiperButtonText("Stop Wipers");
          }
        });
      });

      // Listen for pause events to update button text
      rive.on("pause", (event) => {
        const names = event.data;
        names.forEach((name) => {
          if (name === "idle") {
            setTruckButtonText("Start Truck");
          } else if (name === "success") {
            setWiperButtonText("Start Wipers");
          }
        });
      });
    }
  }, [rive]);

  function onStartTruckClick() {
    if (rive) {
      if (rive.playingAnimationNames.includes("idle")) {
        rive.pause("idle");
      } else {
        rive.play("idle");
      }
    }
  }

  function onStartWiperClick() {
    if (rive) {
      if (rive.playingAnimationNames.includes("success")) {
        rive.pause("success");
      } else {
        rive.play("success");
      }
    }
  }

  return (
    <>
      <div>
        <RiveComponent style={{ height: "1000px" }} />
      </div>
      <div>
        <button id="idle" onClick={onStartTruckClick}>
          {truckButtonText}
        </button>
        <button id="wipers" onClick={onStartWiperClick}>
          {wiperButtonText}
        </button>
      </div>
    </>
  );
}
