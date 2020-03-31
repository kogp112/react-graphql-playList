import * as React from "react";
import TreeViewCategory from "./components/treeview-category";
import SelectedCategory from "./components/selected-category";
import PlayList from "./components/play-list";
import MovieArea from "./components/movie-area";
import Grid from "@material-ui/core/Grid";
import "./App.css";

export default function App() {
  const [selectValues, setSelectValues] = React.useState<[]>([]);
  const [selectLists, setSelectLists] = React.useState<string[]>([]);
  const [selectUrl, setSelectUrl] = React.useState<string>();

  const onClickTreeView = (event: React.ChangeEvent<{ value: string[] }>) => {
    setSelectValues([...selectValues, event]);
  };

  const onClickSelectedCategory = (event: React.ChangeEvent<{ value: string[] }>) => {
    setSelectLists(event);
  };

  const onClickSelectedCategorySecond = (event: React.ChangeEvent<{ value: string[] }>) => {
    setSelectValues(event);
  };

  const onClickPlayList = (event: React.ChangeEvent<{ value: string }>) => {
    setSelectUrl(event);
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
            url={selectUrl}
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
          <PlayList list={selectLists} handleClickPlayList={onClickPlayList} />
        </Grid>
      </Grid>
    </>
  );
}
