import React from "react";
import { useDropzone } from "react-dropzone";

export function DropZone() {
  const { getRootProps, getInputProps } = useDropzone();

  return (
    <div
      {...getRootProps({
        onClick: (event) => console.log("event", event),
      })}
    >
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
}
