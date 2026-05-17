'use client';
import { useEffect, useRef } from "react";
import katex from 'katex';

export default function MathContent({ content }) {
  const ref = useRef(null);

  // useEffect(() => {
  //   if (!ref.current) return;

  //   const html = content
  //     .split('\\n')
  //     .map(line => {
  //       return line
  //         // \begin{equation} ... \end{equation}
  //         .replace(/\\begin\{equation\*?\}([\s\S]*?)\\end\{equation\*?\}/g, (_, math) =>
  //           katex.renderToString(math.trim(), { throwOnError: false, displayMode: true })
  //         )
  //         // \[ ... \]
  //         .replace(/\\\[([\s\S]*?)\\\]/g, (_, math) =>
  //           katex.renderToString(math.trim(), { throwOnError: false, displayMode: true })
  //         )
  //         // \( ... \)
  //         .replace(/\\\(([\s\S]*?)\\\)/g, (_, math) =>
  //           katex.renderToString(math.trim(), { throwOnError: false, displayMode: false })
  //         )
  //         // after the equation replace, add:
  //       .replace(/\\begin\{align\*?\}([\s\S]*?)\\end\{align\*?\}/g, (_, math) =>
  // katex.renderToString(math.trim(), { throwOnError: false, displayMode: true })
  //       )
  //   .replace(/\\begin\{gather\*?\}([\s\S]*?)\\end\{gather\*?\}/g, (_, math) =>
  // katex.renderToString(math.trim(), { throwOnError: false, displayMode: true })
  //   );      
  //     })
  //     .join('<br/>');

  //   ref.current.innerHTML = html;
  // }, [content]);

  useEffect(() => {
    if (!ref.current) return;

    const html = content
      // process multiline block math BEFORE splitting on \n
      .replace(/\\\[([\s\S]*?)\\\]/g, (_, math) =>
        katex.renderToString(math.trim(), { throwOnError: false, displayMode: true })
      )
      .replace(/\\begin\{array\}([\s\S]*?)\\end\{array\}/g, (_, math) =>
        katex.renderToString(('\\begin{array}' + math + '\\end{array}').trim(), { throwOnError: false, displayMode: true })
      )
      
      .split('\\n')
      .map(line => {
        return line
          .replace(/\\begin\{equation\*?\}([\s\S]*?)\\end\{equation\*?\}/g, (_, math) =>
            katex.renderToString(math.trim(), { throwOnError: false, displayMode: true })
          )
          .replace(/\\\[([\s\S]*?)\\\]/g, (_, math) =>
            katex.renderToString(math.trim(), { throwOnError: false, displayMode: true })
          )
          .replace(/\\\(([\s\S]*?)\\\)/g, (_, math) =>
            katex.renderToString(math.trim(), { throwOnError: false, displayMode: false })
          )
          .replace(/\\begin\{align\*?\}([\s\S]*?)\\end\{align\*?\}/g, (_, math) =>
            katex.renderToString(math.trim(), { throwOnError: false, displayMode: true })
          )
          .replace(/\\begin\{gather\*?\}([\s\S]*?)\\end\{gather\*?\}/g, (_, math) =>
            katex.renderToString(math.trim(), { throwOnError: false, displayMode: true })
          );
      })
      .join('<br/>');

    ref.current.innerHTML = html;
  }, [content]);

  return <span ref={ref} />;
}