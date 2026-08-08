'use client';

import React, { useState, useRef } from 'react';
import { X, Upload, Camera, CheckCircle2, AlertCircle } from 'lucide-react';
import { uploadPortfolioPost } from '@/app/actions/portfolio';
import { createClient } from '@/lib/supabase/client';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated?: () => void;
}

export default function CreatePostModal({ isOpen, onClose, onPostCreated }: CreatePostModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string>('');

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please upload a valid image file (PNG, JPG, WebP).');
      return;
    }
    setErrorMsg('');
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Title is required.');
      return;
    }

    if (!selectedFile) {
      setErrorMsg('Image is required.');
      return;
    }

    setIsUploading(true);
    setErrorMsg('');

    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('description', description.trim());
      formData.append('tags', tags);
      formData.append('image', selectedFile);

      const result = await uploadPortfolioPost(formData);

      if (result.error) {
        setErrorMsg(result.error);
        setIsUploading(false);
        return;
      }

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        if (onPostCreated) onPostCreated();
        onClose();
      }, 1500);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to create portfolio post');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white">
          <h2 className="text-xl font-bold text-black flex items-center gap-2">
            <Camera className="h-5 w-5 text-gray-800" /> Upload Artwork
          </h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-black transition-colors rounded-full hover:bg-gray-50">
            <X className="h-5 w-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-16 text-center animate-in zoom-in-95 duration-300">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-500 ring-1 ring-green-100">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-black">Artwork Published!</h3>
          </div>
        ) : (
          <div className="overflow-y-auto p-6 flex-1 bg-white custom-scrollbar">
            {errorMsg && (
              <div className="mb-6 flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-600 border border-red-100">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Image <span className="text-red-500">*</span>
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 cursor-pointer transition-all ${
                    isDragging
                      ? 'border-black bg-gray-50'
                      : previewUrl
                      ? 'border-gray-200 bg-white'
                      : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                    className="hidden"
                  />

                  {previewUrl ? (
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-100 group border border-gray-200">
                      <img src={previewUrl} alt="Upload Preview" className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs font-bold text-white bg-black/80 px-4 py-2 rounded-lg">
                          Change Image
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center flex flex-col items-center">
                      <div className="h-12 w-12 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-4 shadow-sm">
                        <Upload className="h-5 w-5 text-gray-500" />
                      </div>
                      <p className="text-sm font-bold text-black">
                        Drag & drop artwork here, or <span className="underline">browse</span>
                      </p>
                      <p className="mt-1 text-xs text-gray-500">Supports PNG, JPG, WebP up to 5MB</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Project Title <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Neon Cyberpunk Metropolis"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe tools used, lighting setups, or design choices..."
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Tags</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="e.g. 3d, concept art (comma separated)"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="flex items-center gap-2 rounded-xl bg-black px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  {isUploading ? 'Uploading...' : 'Publish'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
