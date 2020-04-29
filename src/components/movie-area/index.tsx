import * as React from "react";
import Box from "@material-ui/core/Box";

export default function MovieArea(props: PropsType) {
  return (
    <Box width="100%" height="100%">
      <iframe width="565px" height="400px" src={changeUrl(props.url)} allow="accelerometer; autoplay; encrypted-media; picture-in-picture">
      </iframe>
    </Box>
  );
}

function changeUrl(url: string) {
  if (url !== undefined) {
    const splitName = url.replace("watch?v=", "embed/");
    return splitName;
  }
  return;
}

interface PropsType {
  url: string;
}
