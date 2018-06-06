import React, { Component } from 'react';
import { Dropbox } from 'dropbox';

const RenderItems = ({text, folder, star}) => {
  const extensions = /\.(jpg|png|PNG|gif)\b/;
  return(
    <div>
      {text[".tag"] === 'file' && !text.name.match(extensions) &&
      <div>
        <h2>
          file
        </h2>
        <p>
        {text.name}
      </p>
        <p>
        {text.size}kb
      </p>
      </div>
      }

      {text[".tag"] === 'file' && text.name.match(extensions) &&
      <div>
        <h2>IMG</h2>
        <p>
        {text.name}
        </p>
        {`Size: ${text.size}kb Last modified: ${text.client_modified}`}
      </div>
      }

      {text[".tag"] === 'folder' &&
      <div>
        <h2 onClick={folder}>
          folder
        </h2>
        <p>
          {text.name}
        </p>
        </div>
      }
      </div>
  )
}

const RenderUpload = ({upload}) => (
  <form onSubmit={upload}>
  <input type="file" id="upload-file" placeholder="Upload file" />
  <button type="submit">Upload</button>
  </form>
)

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
      
    const UPLOAD_FILE_SIZE_LIMIT = 150 * 1024 * 1024;
    var dbx = new Dropbox({ accessToken: localStorage.getItem("token") });
    var fileInput = document.getElementById('upload-file');
    var file = fileInput.files[0];
    
    if (file.size < UPLOAD_FILE_SIZE_LIMIT) { // File is smaller than 150 Mb - use filesUpload API
      dbx.filesUpload({path: '/' + file.name, contents: file})
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
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
            <RenderItems key={item.id} text={item} folder={() => this.folderClick(item.path_lower, item.name)}/>
          )
        })}
      </div>
    )
  }
  }

export default Items;