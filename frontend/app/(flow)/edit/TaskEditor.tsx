import React, { useState } from 'react'
import { MdEditor } from 'md-editor-rt';
import Header from './Header';

export default function TaskEditor() {
  const [content, setContent] = useState('# Hello Editor');
  return (
    <div className='min-h-[100dvh]'>TaskEditor
      <Header />

      <div>

        <MdEditor modelValue={content} onChange={setContent} />;
      </div>

    </div>
  )
}
