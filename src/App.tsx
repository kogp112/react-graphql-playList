import * as React from "react";
import TreeViewCategory from "./components/treeview-category";
import SelectedCategory from "./components/selected-category";
import PlayList from "./components/play-list";
import MovieArea from "./components/movie-area";
import Grid from "@material-ui/core/Grid";
import "./App.css";

export default function App() {
  const [selectValues, setSelectValues] = React.useState<string[]>([]);
  const [playLists, setPlayLists] = React.useState<string[]>([]);
  const [musicUrl, setMusicUrl] = React.useState<string>();

  const onClickTreeView = (event: string) => {
    setSelectValues( [...selectValues, event] );
  };

  const onClickSelectedCategory = (event: string[]) => {
    setPlayLists(event);
  };

  const onClickSelectedCategorySecond = (event: any) => {
    setSelectValues(event);
  };

  const onClickPlayList = (event: string) => {
    setMusicUrl(event);
  };

  function CenterRow() {
    return (
      <React.Fragment>
        <Grid item>
          <SelectedCategory
            genres={selectValues}
            handleClick={onClickSelectedCategory}
            handleClickSecond={onClickSelectedCategorySecond}
          />
        </Grid>
        <Grid item>
          <MovieArea
            className="MovieArea"
            url={musicUrl}
          />
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <>
      <h1 className="h1">Reddit PlayList</h1>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TreeViewCategory handleClick={onClickTreeView} />
        </Grid>
        <Grid item xs={5}>
          <CenterRow />
        </Grid>
        <Grid item xs={3}>
          <PlayList list={playLists} handleClickPlayList={onClickPlayList} />
        </Grid>
      </Grid>
    </>
  );
}
