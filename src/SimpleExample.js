import { Button } from "@material-ui/core";
import React, { useState, useEffect, useCallback } from "react";

export default function SimpleExample() {
  const [images, setImages] = useState([]);
  const [repeatNum, setRepeatNum] = useState(9);
  const [gridRule, setGridRule] = useState("");
  const [isAutoFit, setIsAutofit] = useState(false);
  const [gap, setGap] = useState(0);
  const [specialElement, setSpecialElement] = useState({});

  useEffect(() => {
    // fetch("https://picsum.photos/v2/list?page=2&limit=40").then(res => res.json()).then(res => console.log(res))
    // fetch("https://picsum.photos/v2/list?page=2&limit=40")
    //   .then((res) => res.json())
    //   .then((res) =>
    //     setImages(res.map((item) => ({ ...item, width: Math.random() * 100 + 200, height: Math.random() * 100 + 200 })))
    //   );
    setImages(
      [...new Array(40)].map((i, index) => ({
        width: Math.random() * 100 + 200,
        height: Math.random() * 100 + 200,
        backgroundColor: `hsl(${index * 2}, 60%, 62%)`,
      }))
    );
  }, []);

  window.onclick = () => console.log(gridRule);

  useEffect(() => {
    if (isAutoFit) setGridRule("repeat(auto-fit , minmax(250px, 1fr))");
    else setGridRule(`repeat(${repeatNum} , 1fr )`);
  }, [isAutoFit, repeatNum, gap]);

  return (
    <div style={{ padding: 40 }}>
      <div style={{ display: "grid", gridTemplateColumns: gridRule, gap: gap, minHeight: "80vh" }}>
        {images.map((img) => (
          <div
            className="grid-image"
            style={{
              backgroundImage: `url("${img.download_url}")`,
              backgroundColor: img.backgroundColor
            }}
          ></div>
        ))}
        <div
          style={{
            border: "1px solid red",
            gridColumnStart: specialElement.gridColumnStart,
            gridColumnEnd: specialElement.gridColumnEnd,
            gridRowStart: specialElement.gridRowStart,
            gridRowEnd: specialElement.gridRowEnd,
            backgroundImage: `url("${images[0]?.download_url}")`,
            backgroundColor: "#333"
          }}
        ></div>
      </div>
      <div
      className="footer"
      >
        <div>repeat: {repeatNum}</div>
        <input type="range" value={repeatNum} min={2} max={20} step={1} onChange={({ target }) => setRepeatNum(target.value)} />
        <div>gap: {gap}</div>
        <input type="range" value={gap} min={0} max={20} step={1} onChange={({ target }) => setGap(parseInt(target.value))} />
        <div>
          auto fit: <input type="checkbox" onClick={() => setIsAutofit(!isAutoFit)} />
        </div>
      </div>
      <div
        className="footer2"
      >
        <div>gridColumnStart: {specialElement.gridColumnStart}</div>
        <input
          type="number"
          min={2}
          max={20}
          step={1}
          onChange={({ target }) => setSpecialElement({ ...specialElement, gridColumnStart: parseInt(target.value) })}
        />
        <div>gridColumnEnd: {specialElement.gridColumnEnd}</div>
        <input
          type="number"
          min={2}
          max={20}
          step={1}
          onChange={({ target }) => setSpecialElement({ ...specialElement, gridColumnEnd: parseInt(target.value) })}
        />
        <div>gridRowStart: {specialElement.gridRowStart}</div>
        <input
          type="number"
          min={2}
          max={20}
          step={1}
          onChange={({ target }) => setSpecialElement({ ...specialElement, gridRowStart: parseInt(target.value) })}
        />
        <div>gridRowEnd: {specialElement.gridRowEnd}</div>
        <input
          type="number"
          min={2}
          max={20}
          step={1}
          onChange={({ target }) => setSpecialElement({ ...specialElement, gridRowEnd: parseInt(target.value) })}
        />
      </div>

      <div
        style={{
          position: "fixed",
          bottom: 1,
          right: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#333",
          padding: 5,
          color: "white",
          display: "flex",
          flexDirection: "column",
        }}
      ><Button variant="contained" onClick={() => setImages([...images, {backgroundColor: `hsl(${images.length * 2},60%, 62%)`}])}>Add</Button></div>
    </div>
  );
}
