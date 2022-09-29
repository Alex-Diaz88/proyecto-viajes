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
          <div key={`${photo}${index}`}>
            {index === currentPhoto && (
              <img
                className="img-image"
                src={`${process.env.REACT_APP_API_URL}/travels/${photo.name}`}
                alt={travelName}
              />
            )}
          </div>
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
