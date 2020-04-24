import React, {Component} from 'react';
import './App.css';
import Axios from 'axios';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {data: []};
  }
  componentDidMount() {
    Axios.get("http://localhost:3003/blogPosts")
      .then( response => {
        this.setState({data: response.data})});
  }

  render(){
    if(this.state && this.state.data){
      console.log(this.state.data);
      const dataTable = this.state.data.map( (blogPost, i) => {
        return <tr>
                <td>{blogPost.category}</td>
                <td>{blogPost.postDate}</td>
                <td><a href="mailto: {blogPost.authorEmailAddress}"></a>{blogPost.authorName}</td>
                <td>{blogPost.subject}</td>
               </tr>
      });
      return <div>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Date</th>
              <th>Author</th>
              <th>Subject</th>
            </tr>
          </thead>
          <tbody>
            {dataTable}
          </tbody>
        </table>
      </div>;
    }
    return null;
    
  }
}

export default App;
