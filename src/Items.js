import React, { Component } from 'react';
import { Dropbox } from 'dropbox';

//Components

import RenderItems from './components/RenderItems';
import RenderUpload from './components/RenderUpload';

class Items extends Component {
  constructor() {
    super();
    
    this.state = {
      items: [],
      starred: [],
      path: ""
    }
  }
  
  componentDidMount() {
    let dbx = new Dropbox({ accessToken: localStorage.getItem("token") });
    dbx.filesListFolder({path: ""})
    .then(
      (result) => {
        this.setState({
          items: result.entries
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          error
        });
      }
    ); 
  }
  
  
  starrItems = (item) => {
    let items = this.state.starred.slice();
    if (items.indexOf(item) === -1) {
      items.push(item);
    }
    this.setState({
      starred: items
    });
  }
  
  removeStar = (id) => {
    this.setState({
      starred: this.state.starred.filter((star) => star.id !== id)
    });
  } 
  
    folderClick = (path_lower, name) => {
      this.setState({
        items: []
      })
      let dbx = new Dropbox({ accessToken: localStorage.getItem("token") });
      dbx.filesListFolder({path: path_lower})
      .then((response) => this.setState({items: response.entries}))
      .catch((error) => {
        console.error(error);
      });
      this.setState({
        path: path_lower,
      })
    }

    uploadFile = (e) => {

    e.preventDefault();
      
    var dbx = new Dropbox({ accessToken: localStorage.getItem("token") });
    var fileInput = document.getElementById('upload-file');
    var file = fileInput.files[0];
    
    if (file) {
      dbx.filesUpload({path: this.state.path + "/" + file.name, contents: file})
        .then((response) => {
          let newState = this.state.items.slice();
          newState.push({
            ".tag" : "file",
            client_modified: response.client_modified,
            id: response.id,
            name: response.name,
            path_display: response.path_display,
            path_lower: response.path_lower,
            rev: response.rev,
            server_modified: response.server_modified,
            size: response.size
          })
          this.setState({
            items: newState
          })
        })
        .catch((error) => {
          console.error(error);
        });
    }else{
      alert('Select a file');
    }
    return false;
  }

  upToParentFolder = () => {
    this.setState({
      items: []
    })
    let pathCopy = JSON.parse(JSON.stringify(this.state.path))

    let text = pathCopy.split("").reverse().join("");
    pathCopy = text.substring(text.indexOf("/") + 1);
    let text2 = pathCopy.split('').reverse().join("");

    pathCopy = text2

    let dbx = new Dropbox({ accessToken: localStorage.getItem("token") });
    dbx.filesListFolder({path: pathCopy})
    .then((response) => this.setState({items: response.entries}))
    .catch((error) => {
      console.error(error);
    });

    this.setState({
      path: pathCopy
    })
  }
  
    render(){
    return(
  <div className="gride">
    <div className="header">
    <ul>
        <li className="cursor-pointer" onClick={() => this.folderClick("", "")}><i className="fas fa-home"></i></li>
        <li className="cursor-pointer">{this.state.path}</li>
      </ul>
      <i className="fas fa-level-up-alt cursor-pointer" onClick={this.upToParentFolder}></i>
    </div>
    <div className="upload">
    <RenderUpload upload={this.uploadFile}/>
    </div>
    <div className="stared">
    <h1>Starred Items</h1>
        {!this.state.starred.length ? null
        : (
          this.state.starred.map((item, i) => {
            return <RenderItems key={i} text={item} folder={() => this.folderClick(item.path_lower, item.name)} star={() => this.starrItems(item)} remove={() => this.removeStar(item.id)} removestar={true} />;
          })
        )}
    </div>
    <div className="items">
        {this.state.items.map((item, i) => {
          return <RenderItems key={i} text={item} folder={() => this.folderClick(item.path_lower, item.name)} star={() => this.starrItems(item)} remove={() => this.removeStar(item.id)} />
        })}
      </div>
    </div>
    )
  }
  }
  
export default Items;