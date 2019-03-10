import React from 'react';
import { Dropbox } from 'dropbox';

const LoadThumbnail = ({file}) => {
    
        let dbx = new Dropbox({ accessToken: localStorage.getItem("token") });
        dbx.filesGetThumbnail({path: file.path_lower, size: "w64h64"})
            .then((response) => {
                let fileId = file.id;
                let imageUrl = URL.createObjectURL(response.fileBlob);
                document.getElementById(`${fileId}`).src = imageUrl;
            })
            .catch(err => console.log(err));
    
        return (
            <img className="thumbnail" id={file.id} src="" alt="" />
        )
    };

export default LoadThumbnail;