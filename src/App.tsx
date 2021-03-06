import * as React from "react";
import TreeViewCategory from "./components/treeview-category";
import SelectedCategory from "./components/selected-category";
import PlayList from "./components/play-list";
import MovieArea from "./components/movie-area";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

export default function App() {
  const initSongs = {
    name: "",
    songs: [
      {
        name: "",
        url: "",
        imageUrl: "",
      },
    ],
  };
  const [selectValues, setSelectValues] = React.useState<string[]>([]);
  const [playLists, setPlayLists] = React.useState<PlayList>(initSongs);
  const [musicUrl, setMusicUrl] = React.useState<string>("");

  const onClickTreeView = (event: string) => {
    setSelectValues([...selectValues, event]);
  };
  const onClickSelectedCategory = (event: PlayList) => {
    setPlayLists(event);
  };
  const onClickPlayList = (event: string) => {
    setMusicUrl(event);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2" component="h2">
            Music PlayList
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <TreeViewCategory handleClick={onClickTreeView} />
        </Grid>
        <Grid item xs={5}>
          <SelectedCategory
            genres={selectValues}
            handleClick={onClickSelectedCategory}
          />
          <MovieArea url={musicUrl} />
        </Grid>
        <Grid item xs={4}>
          <PlayList list={playLists} handleClickPlayList={onClickPlayList} />
        </Grid>
      </Grid>
    </>
  );
}

interface PlayList {
  name: string;
  songs: Songs[];
}

interface Songs {
  name: string;
  url: string;
  imageUrl: string;
}
