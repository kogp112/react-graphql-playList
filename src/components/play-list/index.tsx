import * as React from "react";
import "./index.css";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";

interface PropsType {
  list: string[];
  name: string;
  handleClickPlayList: (arg0: any) => void;
}

const PlayListRow = (props: { onClick: (arg0: any) => void; children: { [x: string]: React.ReactNode; }; }) => {
  return (
    <Grid container spacing={2}>
      <Grid item>
        <ButtonBase onClick={(event) => {
        props.onClick(props.children["url"]);
        event.preventDefault();
      }}>
          <img className="musicImage" src={props.children["imageUrl"]} />
        </ButtonBase>
      </Grid>
      <Grid item>
        <ButtonBase>
          {props.children["name"]}
        </ButtonBase>
      </Grid>
    </Grid>
  );
};

export default function PlayList(props: PropsType) {
    if (props.list.length !== 0) {
      return (
        <>
          <div>{props.list[0]["name"] ? props.list[0]["name"] : null}</div>
          {props.list[0]["songs"] ? Object.keys(props.list[0]["songs"]).map((value, index) => (
            <PlayListRow onClick={props.handleClickPlayList} children={props.list[0]["songs"][index]} />
          )) : null}
        </>
      );
    } else {
      return [];
    }
}