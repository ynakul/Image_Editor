import React, { useContext } from 'react';
import { ImageContext } from '../context/ImageContext';

const Adjustments: React.FC = () => {
  const context = useContext(ImageContext);

  if (!context) {
    return <div>Error: Context not found!</div>;
  }

  const { adjustments, setAdjustments } = context;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdjustments({
      ...adjustments,
      [name]: parseFloat(value),
      
    });
  };
 let b= Number(0);
  if (adjustments.brightness !== 1) {
    b = Number((adjustments.brightness - 1).toFixed(1));
  }

  let c= Number(0);
  if (adjustments.contrast !== 1) {
    c= Number((adjustments.contrast - 1).toFixed(1));
  }

  let s= Number(0);
  if (adjustments.saturation !== 1) {
    s = Number((adjustments.saturation - 1).toFixed(1));
  }
  return (
    <div className="adjustments">
      <label>
        Brightness: {b}
        <input
          type="range"
          name="brightness"
          min="0"
          max="2"
          step="0.1"
          value={adjustments.brightness}
          onChange={handleChange}
        />
      </label>
      <label>
        Contrast:{c}
        <input
          type="range"
          name="contrast"
          min="0"
          max="2"
          step="0.1"
          value={adjustments.contrast}
          onChange={handleChange}
        />
      </label>
      <label>
        Saturation:{s}
        <input
          type="range"
          name="saturation"
          min="0"
          max="2"
          step="0.1"
          value={adjustments.saturation}
          onChange={handleChange}
        />
      </label>
      <label>
        Rotation
        <input
          type="range"
          name="rotation"
          min="0"
          max="360"
          step="1"
          value={adjustments.rotation}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default Adjustments;
