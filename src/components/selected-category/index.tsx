import * as React from "react";

interface Props {
  genres: string[],
}

class SelectedCategory extends React.Component<Props, {}> {
  public render() {
    console.log("category is",　this.props.genres);
    return (
      <>
        {Object.keys(this.props.genres).map((value, index) => (
          <p>
            {this.props.genres[index]}
          </p>
        ))}
      </>
    );
  }
}

export default SelectedCategory;
