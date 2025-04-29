// "use client";

import {
  Controller,
  Control,
  FieldValues,
  Path,
  FieldErrors,
} from "react-hook-form";
// import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "./TextEditor.css";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface RichTextEditorFieldProps<T extends FieldValues> {
  registerName: Path<T>;
  label?: string;
  control: Control<T>;
  errors?: FieldErrors<T>;
}

const TextEditor = <T extends FieldValues>({
  registerName,
  label,
  control,
  errors,
}: RichTextEditorFieldProps<T>) => {
  return (
    <div className="w-full">
      {label && <label className="block font-medium mb-2">{label}</label>}
      <Controller
        name={registerName}
        control={control}
        render={({ field }) => (
          <ReactQuill
            {...field}
            theme="snow"
            onChange={(content) => field.onChange(content)}
            placeholder="Enter you description..."
            className="min-h-52 rounded-lg p-2 shadow-[0px_1px_4px_0px_rgba(16,24,40,0.10),0px_1px_4px_0px_rgba(16,24,40,0.06)]"
          />
        )}
      />
      {errors?.[registerName] && (
        <p className="text-red-500 text-sm mt-2">
          {errors[registerName]?.message as string}
        </p>
      )}
    </div>
  );
};

export default TextEditor;
