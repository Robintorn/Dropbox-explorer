import React from 'react';
import { Dropbox } from 'dropbox';

const onDownload = ({file}) => {
      let dbx = new Dropbox({ accessToken: localStorage.getItem("token") });
      dbx.filesGetTemporaryLink(file.path_lower) 
      .then(data => { 
        let fileName = data.name;
        document.getElementById(`${fileName}`).setAttribute('href', data);
      })
      return (
        <a id={file.name} href="">Download</a>
      )
    } 

export default onDownload;