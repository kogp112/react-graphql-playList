import * as React from "react";

interface PropsType {
  url?: string;
}

class MovieArea extends React.Component<PropsType, {}> {
  public render() {
    return (
      <div><iframe width="300" height="180" src={this.props.url} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe></div>
    );
  }
}

export default MovieArea;
