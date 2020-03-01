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
  genres: string[],
}

const handleClickButton = (genre: string) => {
  fetch(url, opts(genre))
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('reddit songs response', responseJson);
    })
    .catch((error) => {
      console.error(error);
    });
};

class SelectedCategory extends React.Component<Props, {}> {
  public render() {
    console.log("category is",　this.props.genres);
    console.log("category type is", typeof this.props.genres);
    return (
      <>
        {Object.keys(this.props.genres).map((value, index) => (
          <Button color="secondary" onClick={handleClickButton(this.props.genres[index])}>
            {this.props.genres[index]}
          </Button>
        ))}
      </>
    );
  }
}

export default SelectedCategory;
