

export const getEditorConfig =async ({data})=> {
  const Header = (await import('@editorjs/header')).default;
  const ImageTool = (await import('@editorjs/image')).default;
  const InlineCode = (await import('@editorjs/inline-code')).default;
  const Table = (await import('@editorjs/table')).default;
  const ColorPicker=(await import('editorjs-color-picker')).default;
   const Marker=(await import('@editorjs/marker')).default;

;

  return{
  tools: {
    header:{
      class: Header,
     config: {
    placeholder: 'Enter a header',
    levels: [1, 2, 3, 4],
    defaultLevel: 2,
    defaultAlignment:'center'
  }},

    image: {
      class: ImageTool,
      config: {
        endpoints: {
          byFile: `http://localhost:3000/api/uploadfile?slug=${data.slug}&sem=${data.sem}&coursecode=${data.coursecode}&year=${data.year}&qno=${data.qno}`, //  backend file uploader endpoint
      },
    }},

    inlineCode: {
  class: InlineCode,
  shortcut: 'CMD+SHIFT+C',
},
    table: Table,

    Marker: {
      class: Marker,
      shortcut: 'CMD+SHIFT+M',
    },

    ColorPicker: {
      class: ColorPicker,
      }

  }
};}
