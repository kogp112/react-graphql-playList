import * as React from "react";

interface PropsType {
  url: string;
}

export default function MovieArea(props: PropsType) {
  return (
    <div><iframe width="500" height="400" src={props.url} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe></div>
  );
};
