import React from 'react';
import OnDownload from '../assets/OnDownload';
import LoadThumbnail from '../assets/LoadThumbnail';

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
          {`Size: ${text.size}kb Last modified: ${text.client_modified}`}
        </p>
        <OnDownload file={text}/>
        </div>
        }
  
        {text[".tag"] === 'file' && text.name.match(extensions) &&
        <div>
          <LoadThumbnail file={text}/>
          <p>
          {text.name}
          </p>
          <p>{`Size: ${text.size}kb Last modified: ${text.client_modified}`}</p>
          <OnDownload file={text}/>
          <br />
          <button onClick={star}>Star</button>
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
          <button onClick={star}>Star</button>
          </div>
        }
        {text.starred && (
          <div>{text.name}</div>
        )}
        </div>
    )
  };

export default RenderItems;