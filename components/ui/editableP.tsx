"use client"
import React, { useState } from 'react';
import { Textarea } from './textarea';

function EditableParagraph({defaultValue}: {defaultValue: string}) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(defaultValue);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setText(event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <Textarea className=' w-full' value={text} onChange={handleChange} onBlur={handleBlur} autoFocus />
      ) : (
        <p onClick={handleEdit}>{text}</p>
      )}
    </div>
  );
}

export default EditableParagraph;