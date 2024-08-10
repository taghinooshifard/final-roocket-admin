import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { StringMap } from "quill";
interface Props {
  value?: string;
  placeHolder: string;
  onChange?: (value: string | undefined) => void;
}
export default function MyComponent(params: Props) {
  const [value, setValue] = useState(params.value);
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];
  const modules: StringMap = { ["toolbar"]: toolbarOptions };
  return (
    <>
      <label>Content:</label>
      <ReactQuill
        modules={modules}
        theme="snow"
        value={value}
        onChange={(value: string) => {
          setValue(value);
          if (params?.onChange) params.onChange(value);
        }}
        placeholder={params.placeHolder}
      />
    </>
  );
}
