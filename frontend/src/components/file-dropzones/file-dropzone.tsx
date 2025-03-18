import { useEffect, useState } from 'react';
import { CloudUploadIcon, Paperclip, Trash2 } from 'lucide-react';
import { Accept, useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

type FileDropzoneProps = {
  accept?: Accept;
  isMultiple?: boolean;
  onFileChange?: (files: File[]) => void;
};

const FileDropzone = ({
  accept,
  isMultiple = false,
  onFileChange,
}: FileDropzoneProps) => {
  const [files, setFiles] = useState<File[]>([]); // State to track the files

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    multiple: isMultiple,
    onDrop: acceptedFiles => {
      if (acceptedFiles.length === 0) {
        return;
      }

      if (!isMultiple) {
        setFiles([acceptedFiles[0]]);
      } else {
        // If multiple, add only files that are not already in state
        setFiles(prevFiles => [
          ...prevFiles,
          ...acceptedFiles.filter(
            file => !prevFiles.some(f => f.name === file.name),
          ),
        ]);
      }
    },
    onDropRejected() {
      toast.error('Some files could not be uploaded.');
    },
  });

  // Handle file removal
  const removeFile = (fileToRemove: File) => {
    setFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove));
  };

  useEffect(() => {
    if (onFileChange) {
      onFileChange(files);
    }
  }, [files, onFileChange]);

  return (
    <div className="space-y-2">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`flex w-full flex-col items-center justify-center border-2 px-4 py-6 ${
          isDragActive
            ? 'border-primary text-primary'
            : 'text-muted-foreground border-muted-foreground'
        } hover:bg-muted cursor-pointer rounded-lg border-dashed text-center`}
      >
        <input {...getInputProps()} />
        <CloudUploadIcon size={40} />
        {isDragActive ? (
          <p>Drop the {isMultiple ? 'files' : 'file'} here...</p>
        ) : (
          <p>
            Drag and drop {isMultiple ? 'files' : 'file'} here, or click to
            select {isMultiple ? 'files' : 'file'}
          </p>
        )}
      </div>

      {/* Selected Files */}
      {files.length > 0 && (
        <div>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={index}
                className="text-muted-foreground flex items-center justify-between text-xs"
              >
                <h6 className="flex items-center gap-1">
                  <Paperclip size={12} />
                  <span>
                    {file.name} ({(file.size / 1024).toFixed(2)} KB)
                  </span>
                </h6>
                <button
                  className="rounded p-1 hover:bg-red-100 hover:text-red-500"
                  onClick={() => removeFile(file)}
                  type="button"
                >
                  <Trash2 size={12} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileDropzone;
