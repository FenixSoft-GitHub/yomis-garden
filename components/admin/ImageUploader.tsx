"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export default function ImageUploader({
  images,
  onChange,
  maxImages = 5,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadImage = async (file: File): Promise<string | null> => {
    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const path = `products/${fileName}`;

    const { error } = await supabase.storage
      .from("products")
      .upload(path, file, { cacheControl: "3600", upsert: false });

    if (error) {
      toast.error(`Error al subir ${file.name}`);
      return null;
    }

    const { data } = supabase.storage.from("products").getPublicUrl(path);
    return data.publicUrl;
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const remaining = maxImages - images.length;
    if (remaining <= 0) {
      toast.error(`Máximo ${maxImages} imágenes permitidas`);
      return;
    }

    const filesToUpload = Array.from(files).slice(0, remaining);
    const invalidFiles = filesToUpload.filter(
      (f) => !f.type.startsWith("image/"),
    );

    if (invalidFiles.length > 0) {
      toast.error("Solo se permiten archivos de imagen");
      return;
    }

    setUploading(true);
    const uploaded: string[] = [];

    for (const file of filesToUpload) {
      const url = await uploadImage(file);
      if (url) uploaded.push(url);
    }

    if (uploaded.length > 0) {
      onChange([...images, ...uploaded]);
      toast.success(
        `${uploaded.length} imagen${uploaded.length > 1 ? "es" : ""} subida${uploaded.length > 1 ? "s" : ""}`,
      );
    }

    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const removeImage = async (url: string, index: number) => {
    const supabase = createClient();
    const path = url.split("/products/")[1];

    if (path) {
      await supabase.storage.from("products").remove([`products/${path}`]);
    }

    onChange(images.filter((_, i) => i !== index));
    toast.info("Imagen eliminada");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Zona de drop */}
      {images.length < maxImages && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => !uploading && inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            uploading
              ? "border-green-700 bg-green-950/20"
              : "border-gray-700 hover:border-green-600 hover:bg-green-950/10"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-2 text-green-400">
              <Loader2 className="w-8 h-8 animate-spin" />
              <p className="text-sm">Subiendo imágenes...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-500">
              <Upload className="w-8 h-8" />
              <p className="text-sm font-medium text-gray-300">
                Arrastra imágenes aquí o haz clic para seleccionar
              </p>
              <p className="text-xs">
                PNG, JPG, WEBP · Máx. {maxImages} imágenes · {images.length}/
                {maxImages} usadas
              </p>
            </div>
          )}
        </div>
      )}

      {/* Preview de imágenes */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {images.map((url, index) => (
            <div key={url} className="relative group aspect-square">
              <Image
                src={url}
                alt={`Imagen ${index + 1}`}
                className="w-full h-full object-cover rounded-xl border border-gray-700"
                width={200}
                height={200}
              />
              {/* Badge principal */}
              {index === 0 && (
                <span className="absolute top-1 left-1 bg-green-600 text-white text-xs px-1.5 py-0.5 rounded-md font-medium">
                  Principal
                </span>
              )}
              {/* Botón eliminar */}
              <button
                type="button"
                onClick={() => removeImage(url, index)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <ImageIcon className="w-4 h-4" />
          <span>La primera imagen será la imagen principal del producto</span>
        </div>
      )}
    </div>
  );
}
