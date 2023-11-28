import React from 'react';
import GridLayout from 'react-grid-layout';
import ImageGallery from 'react-image-gallery';

// An array of image objects with src, thumbnail, and description properties
const images = [
  {
    src: 'image1.png',
    thumbnail: 'thumbnail1.jpg',
    description: 'This is the first image'
  },
  {
    src: 'image2.png',
    thumbnail: 'thumbnail2.jpg',
    description: 'This is the second image'
  },

  {
    src: 'image3.png',
    thumbnail: 'thumbnail1.jpg',
    description: 'This is the first image'
  },
  {
    src: 'image4.png',
    thumbnail: 'thumbnail2.jpg',
    description: 'This is the second image'
  },

  {
    src: 'image5.png',
    thumbnail: 'thumbnail1.jpg',
    description: 'This is the first image'
  },
  {
    src: 'image6.png',
    thumbnail: 'thumbnail2.jpg',
    description: 'This is the second image'
  },

  {
    src: 'image7.png',
    thumbnail: 'thumbnail1.jpg',
    description: 'This is the first image'
  },
  {
    src: 'image8.png',
    thumbnail: 'thumbnail2.jpg',
    description: 'This is the second image'
  },

  {
    src: 'image9.png',
    thumbnail: 'thumbnail1.jpg',
    description: 'This is the first image'
  },


  // ... more images
];

// A function that renders the description for each image
const renderDescription = (image) => {
  return (
    <div className="description">
      <h3>{image.description}</h3>
    </div>
  );
};

// A function that renders the image gallery component
const renderImageGallery = () => {
  return (
    <ImageGallery
      items={images}
      showThumbnails={false}
      showPlayButton={false}
      showFullscreenButton={false}
    />
  );
};

// The main component that renders the grid layout with two columns
const ImageGalleryPage = () => {
  // The layout configuration for the grid
  const layout = [
    { i: 'images', x: 0, y: 0, w: 6, h: 10 },
    { i: 'descriptions', x: 6, y: 0, w: 6, h: 10 }
  ];

  return (
    <div className="container">
      <GridLayout className="layout" layout={layout} cols={12} rowHeight={30}>
        <div key="images" className="images">
          {renderImageGallery()}
        </div>
        <div key="descriptions" className="descriptions">
          {images.map(renderDescription)}
        </div>
      </GridLayout>
    </div>
  );
};

export default ImageGalleryPage;
