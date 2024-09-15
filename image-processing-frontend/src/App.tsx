import React from 'react';
import { ImageProvider } from './context/ImageContext';
import ImageUploader from './components/ImageUploader';
import ImagePreview from './components/ImagePreview';
import Adjustments from './components/Adjustments';
import DownloadButton from './components/DownloadButton';
import './App.css';

const App: React.FC = () => {
  return (
    <ImageProvider>
      <div className="container">
      <h1>IMAGE PROCESSING PROJECT</h1>
      <ImageUploader />
      <div className="image-preview-container">
        <ImagePreview />
      </div>
      <div className="adjustments">
        <Adjustments />
      </div>
      <DownloadButton />
    </div>
    </ImageProvider>
  );
}

export default App;

