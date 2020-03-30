import * as React from "react";
import TreeViewCategory from "./components/treeview-category";
import SelectedCategory from "./components/selected-category";
import PlayList from "./components/play-list";
import MovieArea from "./components/movie-area";
import "./App.css";
import Grid from "@material-ui/core/Grid";

export default function App() {
  const [selectValues, setSelectValues] = React.useState<string[]>([]);
  const [selectLists, setSelectLists] = React.useState<string[]>([]);
  const [selectUrl, setSelectUrl] = React.useState<string>();

  const handleClick = (event: React.ChangeEvent<{ value: string[] }>) => {
    setSelectValues([...selectValues, event]);
  };

  const handleClickButton = (event: React.ChangeEvent<{ value: string[] }>) => {
    setSelectLists(event);
  };

  const handleClickPlayList = (event: React.ChangeEvent<{ value: string }>) => {
    setSelectUrl(event);
  };

  function CenterRow() {
    return (
      <React.Fragment>
        <Grid item xs={6}>
          <SelectedCategory genres={selectValues} handleClick={handleClickButton} />
        </Grid>
        <Grid item xs={6}>
          <MovieArea className="MovieArea" url={selectUrl} />
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <>
      <h1 className="h1">Reddit PlayList</h1>
      <Grid container alignItems="center" justify="center" spacing={2}>
        <Grid item xs={3}>
          <TreeViewCategory handleClick={handleClick} />
        </Grid>
        <Grid item xs={5}>
          <CenterRow />
        </Grid>
        <Grid item xs={3}>
          <PlayList list={selectLists} handleClickPlayList={handleClickPlayList} />
        </Grid>
      </Grid>
    </>
  );
}
