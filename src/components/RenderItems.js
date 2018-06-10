import React from 'react';
import OnDownload from '../assets/OnDownload';
import LoadThumbnail from '../assets/LoadThumbnail';

const RenderItems = ({text, folder, star}) => {
    const extensions = /\.(jpg|png|PNG|gif)\b/;
    return(
      <div>
        {text[".tag"] === 'file' && !text.name.match(extensions) &&
        <div className="grid-items">
          <img className="icon-file icon" alt="" src="image/Icon_New_File_256x256.png"/>
          <div className="grid-content">
          <p className="name">
          {text.name}
          </p>
          <p className="size">
          {`Size: ${text.size}kb`}
        </p>
        <p className="modified">
        {`Last modified: ${text.client_modified}`}
        </p>
        </div>
        <div className="grid-buttons file-b">
        <OnDownload file={text}/>
        <br/>
        <button className="star" onClick={star}>Star</button>
        </div>        
        
        </div>
        }
  
        {text[".tag"] === 'file' && text.name.match(extensions) &&
        <div className="grid-items">
          <LoadThumbnail file={text}/>
          <div className="grid-content">
          <p>
          {text.name}
          </p>
          <p>{`Size: ${text.size}kb`}</p>
          <p>
          {` Last modified: ${text.client_modified}`}
          </p>
          </div>
          <div className="grid-buttons file-b">
          <OnDownload file={text}/>
          <br />
          <button className="star" onClick={star}>Star</button>
          </div>
        </div>
        }
  
        {text[".tag"] === 'folder' &&
        <div className="grid-items">
          <img onClick={folder} alt="" className="icon-file" src="image/Folder_4_icon-72a7cf.svg.png"/>
          <div className="grid-content folder-name">
          <p onClick={folder}>
            {text.name}
          </p>
          </div>
          <div className="grid-buttons folder-b">
          <button className="star" onClick={star}>Star</button>
          </div>
          </div>
        }
        {text.starred && (
          <div>{text.name}</div>
        )}
        </div>
    )
  };

export default RenderItems;