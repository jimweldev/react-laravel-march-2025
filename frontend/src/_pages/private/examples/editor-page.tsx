import { useState } from 'react';
import ReactQuillEditor from '@/components/text-editors/react-quill-editor';

const EditorPage = () => {
  const [value, setValue] = useState('');

  return (
    <div>
      <ReactQuillEditor value={value} onChange={setValue} />
      <div dangerouslySetInnerHTML={{ __html: value }} />
    </div>
  );
};

export default EditorPage;
