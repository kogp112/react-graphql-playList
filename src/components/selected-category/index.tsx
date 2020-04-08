import * as React from "react";
import { Grid, makeStyles, createStyles, Theme } from "@material-ui/core";

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

function getLists(genre: string, handleClick: Function) {
  async function fetchData() {
    try {
      const response = await fetch(url, opts(genre));
      const responseJson = await response.json();
      handleClick(responseJson['data']['playlist']);
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
      <button style={{ backgroundColor: "pink", color: "black" }}
        onClick={(event) => {
          getLists(props.text, props.handleClick);
          setButtonText(props.text);
          event.preventDefault();
        }}
      >{props.text}</button>
    );
  } else {
    return (
      <button style={{ backgroundColor: "blue", color: "white" }}
        onClick={(event) => {
          getLists(props.text, props.handleClick);
          setButtonText(props.text);
          event.preventDefault();
        }}
      >{props.text}</button>
    );
  }
};

function SelectedCategory(props: Props) {
  const classes = useStyles();
  return (
    <Grid className={classes.root}>
      {Object.keys(props.genres).map((value, index) => (
        <ShowButton text={props.genres[index]} handleClick={props.handleClick} />
      ))}
    </Grid >
  );
}

export default SelectedCategory;
