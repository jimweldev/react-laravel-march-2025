import ReactQuill from 'react-quill-new';
import { defaultModules } from '@/configs/react-quill.config';
import 'react-quill-new/dist/quill.snow.css';

interface ReactQuillEditorProps {
  type?: 'default' | 'full';
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const ReactQuillEditor = ({
  type = 'default',
  value,
  onChange,
  placeholder,
}: ReactQuillEditorProps) => {
  const modules = type === 'default' ? defaultModules : defaultModules;

  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default ReactQuillEditor;
