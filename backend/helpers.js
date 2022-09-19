const { unlink } = require('fs/promises');
const path = require('path');
const sharp = require('sharp');
const uuid = require('uuid');

const avatarsDir = path.join(__dirname, 'static/avatars');
const travelsDir = path.join(__dirname, 'static/travels');

const generateError = (message, status) => {
    const error = new Error(message);
    error.httpStatus = status;
    return error;
};

async function deletePhoto(photoName, type) {
    try {
        let photoPath;

        if (type === 0) {
            photoPath = path.join(avatarsDir, photoName);
        } else if (type === 1) {
            photoPath = path.join(travelsDir, photoName);
        }

        await unlink(photoPath);
    } catch (error) {
        throw new Error('Error al eliminar la imagen del servidor');
    }
}

async function savePhoto(image, type) {
    try {
        const sharpImage = sharp(image.data);

        let imageDirectory;

        const imageName = uuid.v4() + '.jpg';

        if (type === 0) {
            imageDirectory = path.join(avatarsDir, imageName);

            sharpImage.resize(150, 150);
        } else if (type === 1) {
            imageDirectory = path.join(travelsDir, imageName);
        }

        await sharpImage.toFile(imageDirectory);

        return imageName;
    } catch (error) {
        throw new Error('Error al procesar la imagen');
    }
}

async function validate(schema, data) {
    try {
        await schema.validateAsync(data);
    } catch (error) {
        error.httpStatus = 400;
        throw error;
    }
}

module.exports = {
    generateError,
    deletePhoto,
    savePhoto,
    validate,
};
