import * as React from "react";
import "./index.css";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";

interface PropsType {
  list: string[];
  name?: string;
  handleClickPlayList: (event: string) => void;
}

const PlayListRow = (props: { onClick: (arg0: any) => void; children: { [x: string]: React.ReactNode; }; }) => {
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <ButtonBase onClick={(event) => {
            props.onClick(props.children["url"]);
            event.preventDefault();
          }}>
            <img className="musicImage" src={props.children["imageUrl"]} />
          </ButtonBase>
        </Grid>
        <Grid item xs={7}>
          <ButtonBase>
            <p className="musicName">{props.children["name"]}</p>
          </ButtonBase>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default function PlayList(props: PropsType) {
  if (props.list.length !== 0) {
    return (
      <React.Fragment>
        <Grid>
          <Grid item>
            <h3>{props.list[0]["name"] ? props.list[0]["name"] : null}</h3>
          </Grid>
          <Grid item>
            {props.list[0]["songs"] ? Object.keys(props.list[0]["songs"]).map((value, index) => (
              <PlayListRow onClick={props.handleClickPlayList} children={props.list[0]["songs"][index]} />
            )) : null}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div>nothing</div>
      </React.Fragment>
    );
  }
}
