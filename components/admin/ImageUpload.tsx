"use client";
import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  label?: string;
  className?: string;
  aspectRatio?: "square" | "video" | "wide";
}

export default function ImageUpload({ 
  value, 
  onChange, 
  onRemove,
  label = "Upload Image",
  className = "",
  aspectRatio = "video"
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[21/9]"
  };

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    
    try {
      // TODO: Replace with actual Supabase upload
      // import { uploadImage } from '@/lib/supabase/client';
      // const url = await uploadImage(file, 'tours');
      
      // Mock: Create local preview URL
      const url = URL.createObjectURL(file);
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onChange(url);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  if (value) {
    return (
      <div className={`relative ${aspectClasses[aspectRatio]} rounded-2xl overflow-hidden bg-gray-100 ${className}`}>
        <img 
          src={value} 
          alt="Uploaded" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors"
          >
            <Upload size={20} className="text-gray-700" />
          </button>
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="p-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
            >
              <X size={20} className="text-white" />
            </button>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative ${aspectClasses[aspectRatio]} rounded-2xl border-2 border-dashed transition-colors ${
        dragActive 
          ? "border-primary bg-primary/5" 
          : "border-gray-200 hover:border-gray-300 bg-gray-50"
      } ${className}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
      
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isUploading}
        className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-3 cursor-pointer"
      >
        {isUploading ? (
          <>
            <Loader2 size={32} className="text-primary animate-spin" />
            <span className="text-sm text-gray-500">Uploading...</span>
          </>
        ) : (
          <>
            <div className="p-4 bg-gray-100 rounded-full">
              <ImageIcon size={24} className="text-gray-400" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700">{label}</p>
              <p className="text-xs text-gray-400 mt-1">Drag & drop or click to browse</p>
              <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
            </div>
          </>
        )}
      </button>
    </div>
  );
}
