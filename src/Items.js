import React, { Component } from 'react';
import { Dropbox } from 'dropbox';

const RenderItems = ({text, folder}) => {
  const extensions = /\.(jpg|png|PNG|gif)\b/;
  return(
    <div>
      {text[".tag"] === 'file' && !text.name.match(extensions) &&
      <div>
        <h2>
          file
        </h2>
        <p>
        {text.size}kb
      </p>
      </div>
      }

      {text[".tag"] === 'file' && text.name.match(extensions) &&
      <div>
        <h2>IMG</h2>
        <p>
        {text.size}kb
      </p>
      </div>
      }

      {text[".tag"] === 'folder' &&
        <h2 onClick={folder}>
          folder
        </h2>
      }
      <p>
        {text.name}
      </p>
      <p>
        {text.server_modified}
      </p>
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
      console.log(response);
      this.setState({
        items: response,
      })
    }

    folderClick = (path_lower, name) => {
      let dbx = new Dropbox({ accessToken: localStorage.getItem("token") });
      dbx.filesListFolder({path: path_lower})
      .then((response) => this.setState({items: response.entries}))
      .catch((error) => {
        console.error(error);
      });
      console.log(name);
      document.getElementsByTagName('ul')[0].innerHTML += `
      <li>></li>
      <li>${name}</li>
      `
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
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    }
    
    else {
        const maxBlob = 8 * 1000 * 1000; // 8Mb - Dropbox JavaScript API suggested max file / chunk size
        var workItems = [];     
      
        var offset = 0;
        while (offset < file.size) {
          var chunkSize = Math.min(maxBlob, file.size - offset);
          workItems.push(file.slice(offset, offset + chunkSize));
          offset += chunkSize;
        } 
          
        const task = workItems.reduce((acc, blob, idx, items) => {
          if (idx === 0) {
            // Starting multipart upload of file
            return acc.then(() => {
              return dbx.filesUploadSessionStart({ close: false, contents: blob})
                        .then(response => response.session_id)
            });          
          } else if (idx < items.length-1) {  
            // Append part to the upload session
            return acc.then((sessionId) => {
             var cursor = { session_id: sessionId, offset: idx * maxBlob };
             return dbx.filesUploadSessionAppendV2({ cursor: cursor, close: false, contents: blob }).then(() => sessionId); 
            });
          } else {
            // Last chunk of data, close session
            return acc.then((sessionId) => {
              var cursor = { session_id: sessionId, offset: file.size - blob.size };
              var commit = { path: '/' + file.name, mode: 'add', autorename: true, mute: false };              
              return dbx.filesUploadSessionFinish({ cursor: cursor, commit: commit, contents: blob });           
            });
          }          
        }, Promise.resolve());
      task.then((result) => {
        console.log(result);
      }).catch((error) => {
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