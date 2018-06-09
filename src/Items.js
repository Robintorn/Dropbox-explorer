import React, { Component } from 'react';
import { Dropbox } from 'dropbox';

//Components

import RenderItems from './components/RenderItems';
import RenderUpload from './components/RenderUpload';
import RenderStarredItems from './components/RenderStarred';

class Items extends Component {
    constructor() {
      super();
  
      this.state = {
        items: []
      }
    }
  
    componentWillMount() {
      let dbx = new Dropbox({ accessToken: localStorage.getItem("token") });
      dbx.filesListFolder({path: ''})
      .then((response) => this.loadItems(response.entries))
      .catch((error) => {
        console.error(error);
      });
    }
    
  
    loadItems = (response) => {
    response.forEach(item => {
        item["starred"] = false;
    });
      this.setState({
        items: response,
      });
    console.log(response);
    }

    starrItems = (star) => {
      let recipesCopy = JSON.parse(JSON.stringify(this.state.items));
      recipesCopy[1].starred = !this.state.items[1].starred;
      this.setState({
        items: recipesCopy
      });
      console.log(this.state.items);
    }

    folderClick = (path_lower, name) => {
      let dbx = new Dropbox({ accessToken: localStorage.getItem("token") });
      dbx.filesListFolder({path: path_lower})
      .then((response) => this.setState({items: response.entries}))
      .catch((error) => {
        console.error(error);
      });
      console.log(name);
      let create = document.getElementsByTagName('ul')[0];

      let li = document.createElement('li');
      let text = document.createTextNode(">");

      create.appendChild(li);
      li.appendChild(text);

      let li2 = document.createElement('li');
      let text2 = document.createTextNode(name);

      create.appendChild(li2);
      li2.appendChild(text2);
    }

    uploadFile = (e) => {

    e.preventDefault();

    var dbx = new Dropbox({ accessToken: localStorage.getItem("token") });
    var fileInput = document.getElementById('upload-file');
    var file = fileInput.files[0];
    
    if (file) {
      dbx.filesUpload({path: '/' + file.name, contents: file})
        .then((response) => {
          console.log(response);
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    }else{
      alert('Select a file');
    }
    return false;
  }
 
  resetPage = () => {
    window.location.reload();
  }
  
    render(){
    return(
    <div>
      <ul>
        <li onClick={this.resetPage}>DROPBOX</li>
      </ul>
      <RenderUpload upload={this.uploadFile}/>
        {this.state.items.map((item) => {
          return(
            <RenderItems key={item.id} text={item} folder={() => this.folderClick(item.path_lower, item.name)} star={() => this.starrItems(item.starred)}/>
          )
        })}
        <RenderStarredItems />
      </div>
    )
  }
  }
  
export default Items;