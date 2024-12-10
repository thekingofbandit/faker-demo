import React, { Component } from "react";
import "./App.css";
import Axios from "axios";

const labelData = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] , outputs:[]};
  }
  componentDidMount() {
    Axios.get("http://localhost:3001/inputs").then((response) => {
      this.setState({ data: response.data });
    });
    Axios.get("http://localhost:3001/outputs").then((response) => {
      this.setState({ outputs: response.data });
    });
  }

  render() {
    if (this.state && this.state.data) {
      console.log(this.state.data);
      const dataTable = this.state.data.map((data, i) => {
        return (
          <>
            <td>{data.category}</td>
            <td>{data.postDate}</td>
            <td>
              <a href="mailto: {blogPost.authorEmailAddress}"></a>
              {data.authorName}
            </td>
            <td>{data.subject}</td>
          </>
        );
      });

      const d = this.state.data;
      const c = this.state.outputs;

      const LabelHeader = labelData.map((data, i) => {
        return (
          <tr key={i}>
            <td>{data}</td>
            <td> {d[i]?.category}</td>
            <td> {d[i]?.postDate}</td>
            <td> {d[i]?.authorName}</td>
            <td> {d[i]?.subject}</td>
            <td> {c[i]?.category}</td>
            <td> {c[i]?.postDate}</td>
            <td> {c[i]?.authorName}</td>
            <td> {c[i]?.subject}</td>
          </tr>
        );
      });
      return (
        <div>
          <table>
            <thead>
              <tr>
                <th>Label</th>
                <th>sc 1</th>
                <th>sc 1</th>
                <th>sc 1</th>
                <th>sc 1</th>
                <th>sc 1</th>
                <th>sc 1</th>
                <th>sc 1</th>
                <th>sc 1</th>
              </tr>
            </thead>
            <tbody>{LabelHeader}</tbody>
          </table>
        </div>
      );
    }
    return null;
  }
}

export default App;
