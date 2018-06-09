import React from 'react';

const RenderUpload = ({name, remove}) => (
    <div>
        <h3>{name}</h3>
        <button onClick={remove}>Remove star</button>
    </div>
  );

export default RenderUpload;