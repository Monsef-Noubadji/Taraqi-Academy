import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import Quill styles

const Editor = ({text, setText}) => {
//   const [text, setText] = useState('');

  const handleChange = (value) => {
    setText(value);
  };

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
  ]

  return (
    <div style={{height: '200px', width: '100%'}}>
      <ReactQuill
        style={{height: '150px', borderRadius: '20px'}}
        value={text}
        theme="snow"
        modules={modules}
        formats={formats}
        onChange={handleChange}
        placeholder='أدخل وصفا للتقرير'
      />
    </div>
  );
};

export default Editor;
