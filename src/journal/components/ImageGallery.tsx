import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

interface ImageGalleryProps {
  imageUrls?: string[];
}

export const ImageGallery = ({ imageUrls }: ImageGalleryProps) => {


  return (
    <ImageList sx={{ width: '100%', height: 500 }} cols={4} rowHeight={164}>
      {imageUrls!.map((imageUrl) => (
        <ImageListItem key={imageUrl}>
          <img
            src={imageUrl}
            srcSet={imageUrl}
            alt='Note image'
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}