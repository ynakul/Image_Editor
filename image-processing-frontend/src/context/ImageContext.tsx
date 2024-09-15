import React from 'react';

// Define the Adjustments type
interface Adjustments {
  brightness: number;
  contrast: number;
  saturation: number;
  rotation: number;
}

// Define the ImageContextType interface
interface ImageContextType {
  image: string | null;
  setImage: (image: string | null) => void;
  adjustments: Adjustments;
  setAdjustments: (adjustments: Partial<Adjustments>) => void;
}

// Creating the context with initial values
const ImageContext = React.createContext<ImageContextType | undefined>(undefined);

// Define the props for the ImageProvider component
interface ImageProviderProps {
  children: React.ReactNode; // This includes the type for children
}

// Context provider component
const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
  const [image, setImage] = React.useState<string | null>(null);
  const [adjustments, setAdjustmentsState] = React.useState<Adjustments>({
    brightness: 1,
    contrast: 1,
    saturation: 1,
    rotation: 0,
  });

  // Wrapping setAdjustments to match the expected type
  const setAdjustments = (newAdjustments: Partial<Adjustments>) => {
    setAdjustmentsState((prevAdjustments) => ({
      ...prevAdjustments,
      ...newAdjustments,
    }));
  };

  return (
    <ImageContext.Provider
      value={{
        image,
        setImage,
        adjustments,
        setAdjustments,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export { ImageContext, ImageProvider };

