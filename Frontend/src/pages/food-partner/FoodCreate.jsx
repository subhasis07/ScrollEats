import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FoodCreate = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    videoFile: null,
  });
  const [videoURL, setVideoURL] = useState("");
  const [fileError, setFileError] = useState("");

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // update video preview when videoFile changes
  useEffect(() => {
    if (!form.videoFile) {
      setVideoURL("");
      return;
    }
    const url = URL.createObjectURL(form.videoFile);
    setVideoURL(url);
    return () => URL.revokeObjectURL(url);
  }, [form.videoFile]);

  // generic handler for text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setForm((prev) => ({ ...prev, videoFile: null }));
      setFileError("");
      return;
    }
    if (!file.type.startsWith("video/")) {
      setFileError("Please select a valid video file.");
      return;
    }
    setFileError("");
    setForm((prev) => ({ ...prev, videoFile: file }));
  };

  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("video/")) {
      setFileError("Please drop a valid video file.");
      return;
    }
    setFileError("");
    setForm((prev) => ({ ...prev, videoFile: file }));
  };

  const onDragOver = (e) => e.preventDefault();

  const openFileDialog = () => fileInputRef.current?.click();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("video", form.videoFile);

    const response = await axios.post("http://localhost:3000/api/food", formData, {
      withCredentials: true,
    });

    // console.log(response.data);
    navigate(`/food-partner/${response.data.foodPartner}`);
  };

  const isDisabled = useMemo(() => !form.name.trim() || !form.videoFile, [form]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow rounded-xl p-6">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Create Food</h1>
          <p className="text-gray-500 text-sm mt-1">
            Upload a short video, give it a name, and add a description.
          </p>
        </header>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Upload Field */}
          <div>
            <label className="block font-medium mb-2 text-gray-700">Food Video</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={onFileChange}
              className="hidden"
            />

            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-indigo-500 transition"
              role="button"
              tabIndex={0}
              onClick={openFileDialog}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openFileDialog();
                }
              }}
            >
              <svg
                className="mx-auto h-10 w-10 text-gray-400 mb-2"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16v-8m0 0l-3.5 3.5M12 8l3.5 3.5M20 16.5V18a2 2 0 01-2 2H6a2 2 0 01-2-2v-1.5"
                />
              </svg>
              <p className="text-gray-600">
                <span className="font-semibold">Tap to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-400 mt-1">MP4, WebM, MOV • Up to ~100MB</p>
            </div>

            {fileError && (
              <p className="mt-2 text-sm text-red-500" role="alert">
                {fileError}
              </p>
            )}

            {form.videoFile && (
              <div className="mt-4 flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                <div>
                  <p className="font-medium text-gray-700">{form.videoFile.name}</p>
                  <p className="text-xs text-gray-500">
                    {(form.videoFile.size / 1024 / 1024).toFixed(1)} MB
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={openFileDialog}
                    className="text-indigo-600 text-sm hover:underline"
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, videoFile: null }))}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Video Preview */}
          {videoURL && (
            <div className="mt-4">
              <video
                src={videoURL}
                controls
                playsInline
                preload="metadata"
                className="w-full rounded-lg border border-gray-200"
              />
            </div>
          )}

          {/* Food Name */}
          <div>
            <label htmlFor="name" className="block font-medium mb-1 text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g., Spicy Paneer Wrap"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Food Description */}
          <div>
            <label htmlFor="description" className="block font-medium mb-1 text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Write a short description: ingredients, taste, spice level, etc."
              value={form.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isDisabled}
              className={`w-full py-2 px-4 rounded-lg font-medium text-white transition ${
                isDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              Save Food
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoodCreate;
