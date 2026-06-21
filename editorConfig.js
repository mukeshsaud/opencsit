import FontSizeTool from './editorFontSize'; // adjust path
import BgColorTool from './editorBg';


export const getEditorConfig =async ({data})=> {
  const Header = (await import('@editorjs/header')).default;
  const ImageTool = (await import('@editorjs/image')).default;
  const InlineCode = (await import('@editorjs/inline-code')).default;
  const Table = (await import('@editorjs/table')).default;
  const ColorPicker=(await import('editorjs-color-picker')).default;
   const Marker=(await import('@editorjs/marker')).default;
  
   const Paragraph=(await import('@editorjs/paragraph')).default;
   

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
     paragraph: {
      class: Paragraph,
      inlineToolbar: true,
    },
    fontSize: {
    class: FontSizeTool,
    config: {
      fontSizes: [
        { size: '12px', label: 'Small' },
        { size: '14px', label: 'Normal' },
        { size: '16px', label: 'Medium' },
        { size: '20px', label: 'Large' },
        { size: '24px', label: 'XL' },
        { size: '32px', label: 'XXL' },
      ]
    }
  },
  bgColor: {
    class: BgColorTool,
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

export const getQnEditorConfig =async ({data})=> {
  const ImageTool = (await import('@editorjs/image')).default;
   const InlineCode = (await import('@editorjs/inline-code')).default;
   
  return{
  tools: {
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
  }
};}