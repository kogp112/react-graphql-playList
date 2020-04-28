import * as React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import CardHeader from "@material-ui/core/CardHeader";

interface PropsType {
  list: string[];
  name?: string;
  handleClickPlayList: (event: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      margin: 15,
    },
    content: {
      flex: "1 0 auto",
      width: 200,
    },
    cover: {
      width: 151,
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  }),
);

const PlayListRow = (props: { onClick: (arg0: any) => void; children: { [x: string]: React.ReactNode; }; }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Card className={classes.root}>
        <CardHeader
          action={
            <IconButton
              aria-label="play/pause"
              onClick={(event) => {
                props.onClick(props.children["url"]);
                event.preventDefault();
              }}
            >
              <PlayArrowIcon className={classes.playIcon} />
            </IconButton>
          }
        />
        <CardContent className={classes.content}>
          <Typography variant="subtitle2" noWrap={false}>
            {props.children["name"]}
          </Typography>
        </CardContent>
        <CardMedia
          className={classes.cover}
          image={props.children["imageUrl"]}
          title={props.children["name"]}
        />
      </Card>
    </React.Fragment >
  );
};

export default function PlayList(props: PropsType) {
  console.log("props is", typeof props.list[0]["songs"]);
  console.log("props is", props.list[0]["songs"]);
  if (props.list[0]["songs"] !== undefined) {
    const songs = props.list[0]["songs"];
    return (
      <React.Fragment>
        <Grid>
          <Grid item>
            <Typography variant="h5">
              {props.list[0]["name"] ? props.list[0]["name"] : null}
            </Typography>
          </Grid>
          <Grid item>
            {songs === [] ?
              <Typography variant="h5">nothing</Typography> : 
              Object.keys(songs).map((value, index) => (
                <PlayListRow key={value} onClick={props.handleClickPlayList} children={songs[index]} />
              ))
            }
          </Grid>
        </Grid>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div>error</div>
      </React.Fragment>
    );
  }
}
