import * as React from "react";

interface PropsType {
  list?: string[],
  name?: string,
  songs?: string[]
}

const PlayListRow = (props) => {
  console.log("play list row is", props);
  return (
    <>
      <ul>
        <li>{props.children["name"]}</li>
        <li>{props.children["url"]}</li>
        <li>{props.children["imageUrl"]}</li>
      </ul>
    </>
  );
};

class PlayList extends React.Component<PropsType, {}> {
  public render() {
    if (this.props.list.length != 0) {
      console.log('play list component props is ', this.props.list[0]['songs']);
      //console.log('play list component props is ', this.props.list.length);
      return (
        <>
          <div>{this.props.list[0]['name'] ? this.props.list[0]['name'] : null}</div>
            {this.props.list[0]['songs'] ? Object.keys(this.props.list[0]['songs']).map((value, index) => (
              <PlayListRow children={this.props.list[0]['songs'][index]} />
            )) : null}
        </>
      );
    } else {
      return [];
    }
  }
}

export default PlayList;
