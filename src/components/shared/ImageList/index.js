import { ImageList, ImageListItem } from "@mui/material";


const IMAGES = [
    { url: './testImage.png' },
    { url: './testImage.png' },
    { url: './testImage.png' },
]

export const ImageList1 = () => {
  return (
    <>
     {IMAGES.map((image) => (
          <span style={{
            marginLeft: '-60px'
          }}>
                <img src={image.url} width="200px" />
          </span>
      ))}
    </>
  );
}