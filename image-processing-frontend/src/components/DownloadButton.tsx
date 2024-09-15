import React, { useContext, useState } from 'react';
import { ImageContext } from '../context/ImageContext'; // Named import
import axios from 'axios';

const DownloadButton: React.FC = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('DownloadButton must be used within an ImageProvider');
  }
  const { image, adjustments } = context;

  // State for the image format with a default value of 'png'
  const [format, setFormat] = useState<'png' | 'jpeg'>('png');


  const handleDownload = async () => {
    if (image) {
      try {
        const response = await axios.post('http://localhost:5000/download', {
          image,
          adjustments,
        }, {
          responseType: 'blob',
        });
        const url = URL.createObjectURL(response.data);
        const link = document.createElement('a');
        link.href = url;
        link.download = `processed-image.${format}` // Or .jpg based on user preference
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error downloading image:', error);
      }
    }
  };

  return (
    <div className="download-button-container">
      <label>
        Format:
        <select value={format} onChange={(e) => setFormat(e.target.value as 'png' | 'jpeg')}>
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
        </select>
      </label>
  <button className="download-button" onClick={handleDownload}>Download Image</button>
</div>

  );
};

export default DownloadButton;


