import React from 'react';
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
        </div>
        }
  
        {text[".tag"] === 'file' && text.name.match(extensions) &&
        <div>
          <LoadThumbnail file={text}/>
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
  };

export default RenderItems;