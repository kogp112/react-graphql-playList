import * as React from "react";
import "./index.css";

interface PropsType {
  url: string;
}

function changeUrl(url: string) {
  if (url !== undefined) {
    const splitName = url.replace("watch?v=", "embed/");
    console.log(splitName);
    return splitName;
  }
  return;
}

export default function MovieArea(props: PropsType) {
  return (
    <div className="movieArea">
      <iframe text-align="center" width="500" height="400" src={changeUrl(props.url)} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
    </div>
  );
}
