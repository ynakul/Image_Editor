import React, { useContext } from 'react';
import axios from 'axios';
import { ImageContext } from '../context/ImageContext'; // Named import

const ImageUploader: React.FC = () => {
  const context = useContext(ImageContext);

  // Ensure context is defined and has the right properties
  if (!context) {
    throw new Error('ImageContext must be used within an ImageProvider');
  }

  const { setImage } = context;

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post('http://localhost:5000/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setImage(response.data.imagePath); // Adjust based on your backend response
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <input type="file" accept="image/*" onChange={handleFileChange} />
  );
};

export default ImageUploader;

