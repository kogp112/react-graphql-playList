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

export default function PlayList(props: Props) {
  const musics = props.list;
  if (musics.songs !== undefined) {
    const songs = musics.songs;
    return (
      <>
        <Grid>
          <Grid item>
            <Typography variant="h5">
              {musics.name ? musics.name : null}
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
      </>
    );
  } else {
    return (
      <React.Fragment>
        <div>error</div>
      </React.Fragment>
    );
  }
}

const PlayListRow: React.FunctionComponent<PlayListProps> = (props: PlayListProps) => {
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
  const classes = useStyles();
  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          action={
            <IconButton
              aria-label="play/pause"
              onClick={(event) => {
                props.onClick(props.children.url);
                event.preventDefault();
              }}
            >
              <PlayArrowIcon className={classes.playIcon} />
            </IconButton>
          }
        />
        <CardContent className={classes.content}>
          <Typography variant="subtitle2" noWrap={false}>
            {props.children.name}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          className={classes.cover}
          image={props.children.imageUrl}
          title={props.children.name}
          src={props.children.url}
        />
      </Card>
    </>
  );
};

interface Props {
  list: MusicList;
  name?: string;
  handleClickPlayList: (event: string) => void;
}

interface PlayListProps {
  onClick: (arg0: any) => void;
  children: Songs;
}

interface MusicList {
  name: string;
  songs: Songs[];
}

interface Songs {
  name: string;
  url: string;
  imageUrl: string;
}
