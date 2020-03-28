import * as React from "react";
import "./index.css";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";

interface PropsType {
  list?: string[];
  name?: string;
  songs?: string[];
  handleClickPlayList?: Function;
}

const PlayListRow = (props) => {
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

class PlayList extends React.Component<PropsType, {}> {
  public render() {
    if (this.props.list.length !== 0) {
      return (
        <>
          <div>{this.props.list[0]['name'] ? this.props.list[0]['name'] : null}</div>
          {this.props.list[0]['songs'] ? Object.keys(this.props.list[0]['songs']).map((value, index) => (
            <PlayListRow onClick={this.props.handleClickPlayList} children={this.props.list[0]["songs"][index]} />
          )) : null}
        </>
      );
    } else {
      return [];
    }
  }
}

export default PlayList;
