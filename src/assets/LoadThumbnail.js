import React from 'react';
import { Dropbox } from 'dropbox';

const LoadThumbnail = ({file}) => {
    
        let dbx = new Dropbox({ accessToken: localStorage.getItem("token") });
        dbx.filesGetThumbnail({path: file.path_lower, size: "w64h64"})
            .then((response) => {
                let fileName = file.name;
                let imageUrl = URL.createObjectURL(response.fileBlob);
                document.getElementById(`${fileName}`).src = imageUrl;
            });
    
        return (
            <img className="thumbnail" id={file.name} src="" alt="" />
        )
    };

export default LoadThumbnail;