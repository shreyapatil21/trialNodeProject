import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// It helps to gives permission for file upload
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });

// async function uploadOnCloudinary(localFilePath){

// }
async function uploadOnCloudinary(localFilePath) {
    try {
        if(!localFilePath) {
            console.error('Local file path is missing.');
            return { error: 'Local file path is missing' };
        }
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        } );
        // File has been uploaded successfully
        console.log("File is uploaded on Cloudinary.......  ",response.url);
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        console.error('Error uploading file to Cloudinary:', error);
        // Remove the locally saved temporary file as the upload operation got failed
        try {
            fs.unlinkSync(localFilePath);
        } catch (unlinkError) {
            console.error('Error deleting local file: ', unlinkError);
        }
        return null;
    }
}

export { uploadOnCloudinary };