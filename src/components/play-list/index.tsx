import * as React from "react";
import "./index.css";

interface PropsType {
  list?: string[],
  name?: string,
  songs?: string[]
}

const PlayListRow = (props) => {
  console.log("play list row is", props);
  return (
    <>
      <table>
        <tbody>
          <tr>
            <td className="tdImage"><img className="musicImage" src={props.children["imageUrl"]} /></td>
            <td>{props.children["name"]}</td>
          </tr>
          <tr>
            <td>{props.children["url"]}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

class PlayList extends React.Component<PropsType, {}> {
  public render() {
    if (this.props.list.length !== 0) {
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
