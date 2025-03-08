export const defaultModules = {
  toolbar: [
    [{ size: ['small', false, 'large'] }], // Font size
    ['bold', 'italic', 'underline'], // Text formatting
    [{ script: 'sub' }, { script: 'super' }], // Superscript/subscript
    [{ color: [] }, { background: [] }], // Text color and background
    [{ list: 'ordered' }, { list: 'bullet' }], // Lists
    [{ indent: '-1' }, { indent: '+1' }], // Indentation
    ['link'], // Link and image
    ['clean'], // Clear formatting
  ],
};
