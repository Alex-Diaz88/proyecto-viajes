import { useState } from "react";
import prevPhoto from "../../assets/icons/previous-blanca.png";
import nePhoto from "../../assets/icons/next-blanca.png";
import "./styles.css";

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
          <div key={`${photo}${index}`}>
            {index === currentPhoto && (
              <img
                id="img-image"
                src={`${process.env.REACT_APP_API_URL}/travels/${photo.name}`}
                alt={travelName}
              />
            )}
          </div>
        );
      })}

      {photos.length > 1 && (
        <section className="icon_fotos">
          <img
            className="previous_photo"
            alt="anterior fotografía"
            src={prevPhoto}
            onClick={previousPhoto}
          />
          <img
            className="next_photo"
            alt="siguiente fotografía"
            src={nePhoto}
            onClick={nextPhoto}
          />
        </section>
      )}
    </section>
  );
};

export default PhotoSlider;
