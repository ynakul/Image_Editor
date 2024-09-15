import React, { useContext, useEffect, useState } from 'react';
import { ImageContext } from '../context/ImageContext'; // Named import
import axios from 'axios';

const ImagePreview: React.FC = () => {
  const context = useContext(ImageContext);

  // Ensure context is defined and has the right properties
  if (!context) {
    throw new Error('ImageContext must be used within an ImageProvider');
  }

  const { image, adjustments } = context;
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (image) {
      const fetchPreview = async () => {
        try {
          const response = await axios.post('http://localhost:5000/process', {
            image,
            adjustments,
          }, {
            responseType: 'blob',
          });
          const url = URL.createObjectURL(response.data);
          setPreview(url);
        } catch (error) {
          console.error('Error fetching preview:', error);
        }
      };
      fetchPreview();
    }
  }, [image, adjustments]);

  return (
    <div>
      {preview ? <img src={preview} alt="Preview" /> : 'No image uploaded'}
    </div>
  );
};

export default ImagePreview;

