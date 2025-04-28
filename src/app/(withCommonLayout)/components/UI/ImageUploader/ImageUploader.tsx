"use client";

import { Paperclip } from "lucide-react";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/extension/file-uploader";
import { ImageUploadIcon } from "@/assets/icons/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  files: File[] | null;
  setFiles: React.Dispatch<React.SetStateAction<File[] | null>>;
  maxFiles: number;
  isMultiple: boolean;
  fileTypes: string[];
  containerClass?: string;
  children?: React.ReactNode;
}

// maxFiles: 5,
// multiple: true,
// "image/*": [".png", ".jpg", ".jpeg", ".webp", ".pdf"],
const ImageUploader: React.FC<ImageUploaderProps> = ({
  files,
  setFiles,
  maxFiles,
  isMultiple,
  fileTypes,
  containerClass,
  children,
}) => {
  const dropZoneConfig = {
    maxFiles: maxFiles,
    maxSize: 1024 * 1024 * 5,
    multiple: isMultiple,
    accept: {
      "image/*": fileTypes,
    },
  };

  return (
    <>
      <FileUploader
        value={files}
        onValueChange={setFiles}
        dropzoneOptions={dropZoneConfig}
        className={cn("relative", containerClass)}
      >
        <FileInput className="outline-dashed outline-1 outline-white">
          <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full space-y-5">
            <ImageUploadIcon width={36} height={36} />
            {children}
            <Button
              type="button"
              className="text-white text-sm font-medium leading-[20px] rounded-[8px] bg-colorButton px-10 py-2"
            >
              Add Photo
            </Button>
          </div>
        </FileInput>
        <FileUploaderContent>
          {files &&
            files.length > 0 &&
            files.map((file, i) => (
              <FileUploaderItem key={i} index={i}>
                <Paperclip className="h-4 w-4 stroke-current" />
                <span>{file.name}</span>
              </FileUploaderItem>
            ))}
        </FileUploaderContent>
      </FileUploader>
    </>
  );
};

export default ImageUploader;
