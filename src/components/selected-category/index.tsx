import * as React from "react";
import Button from "@material-ui/core/Button";

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
  handleClick: Function;
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
};

function SelectedCategory(props: Props) {
  return (
    <>
      {Object.keys(props.genres).map((value, index) => (
        <Button color="secondary"
          onClick={(event) => {
            getLists(props.genres[index], props.handleClick);
            event.preventDefault();
          }}
        >
          {props.genres[index]}
        </Button>
      ))}
    </>
  );
}

export default SelectedCategory;
