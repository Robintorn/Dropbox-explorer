import React from 'react';
import { Dropbox } from 'dropbox';

const onDownload = ({file}) => {
      let path = file.path_lower;
      let dbx = new Dropbox({ accessToken: localStorage.getItem("token") });
      dbx.filesGetTemporaryLink({path}) 
      .then(data => { 
        let fileName = file.path_display;
        document.getElementById(`${fileName}`).setAttribute('href', data.link);
      })
      return (
        <a id={file.path_display} href="">Download</a>
      )
    } 

export default onDownload;