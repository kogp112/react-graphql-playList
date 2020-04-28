import * as React from "react";
import { createStyles, Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const json = (genre: string) => `{
    playlist(redditUrls: ["` + genre + `"]) {
      name
      songs {
        name
        url
        imageUrl
      }
    }
  }
`;

const url = "https://reddit-music-graphql.herokuapp.com/";

const opts = (genre: string) => {
  const query = json(genre);
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  };
};

interface Props {
  genres: string[];
  handleClick: (event: string[]) => void;
}

interface PropsType {
  text: string;
  handleClick: (event: string[]) => void;
}

function getMusicLists(genre: string, handleClick: (e: []) => void) {
  async function fetchData() {
    try {
      const response = await fetch(url, opts(genre));
      const responseJson = await response.json();
      handleClick(responseJson["data"]["playlist"]);
    } catch (error) {
      console.error(error);
    }
  }
  fetchData();
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "display": "flex",
      "justifyContent": "flex-start",
      "flexWrap": "wrap",
      "& > *": {
        margin: theme.spacing(0.5),
      },
    },
  }),
);

const ShowButton: React.FunctionComponent<PropsType> = (props: PropsType) => {
  const [buttonText, setButtonText] = React.useState("");

  if (buttonText === props.text) {
    return (
      <Button style={{ backgroundColor: "pink", color: "black" }}
        onClick={(event) => {
          getMusicLists(props.text, props.handleClick);
          setButtonText(props.text);
          event.preventDefault();
        }}
      >{props.text}</Button>
    );
  } else {
    return (
      <Button style={{ backgroundColor: "blue", color: "white" }}
        onClick={(event) => {
          getMusicLists(props.text, props.handleClick);
          setButtonText(props.text);
          event.preventDefault();
        }}
      >{props.text}</Button>
    );
  }
};

function SelectedCategory(props: Props) {
  const classes = useStyles();
  return (
    <Grid className={classes.root}>
      {Object.keys(props.genres).map((value, index) => (
        <ShowButton key={value} text={props.genres[index]} handleClick={props.handleClick} />
      ))}
    </Grid >
  );
}

export default SelectedCategory;
