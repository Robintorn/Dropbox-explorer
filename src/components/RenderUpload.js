import React from 'react';

const RenderUpload = ({upload}) => (
    <form onSubmit={upload} id="upload-form">
    <input type="file" id="upload-file" placeholder="Upload file" />
    <button type="submit">Upload</button>
    </form>
  );

export default RenderUpload;