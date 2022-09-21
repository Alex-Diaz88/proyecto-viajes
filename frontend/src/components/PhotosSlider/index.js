/* import "./styles.css"; */
import { useState } from "react";

const PhotoSlider = ({ photos, travelName }) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const previousPhoto = () => {
    if (currentPhoto === photos.length - 1) {
      setCurrentPhoto(0);
      return;
    }

    setCurrentPhoto(currentPhoto + 1);
  };

  const nextPhoto = () => {
    if (currentPhoto === 0) {
      setCurrentPhoto(photos.length - 1);
      return;
    }

    setCurrentPhoto(currentPhoto - 1);
  };

  return (
    <section className="photo_slider">
      {photos.map((photo, index) => {
        return (
          <>
            {index === currentPhoto && (
              <img src={`${process.env.REACT_APP_API_URL}/products/${photo.name}`} alt={travelName} />
            )}
          </>
        );
      })}

      {photos.length > 1 && (
        <>
          <button className="previous_photo" onClick={previousPhoto}>
            {"<-"}
          </button>
          <button className="next_photo" onClick={nextPhoto}>
            {"->"}
          </button>
        </>
      )}
    </section>
  );
};

export default PhotoSlider;
