const { v4: uuidv4 } = require('uuid');

export default function generateFileName(originalFileName) {
    const timestamp = new Date().getTime(); // Current timestamp
    const randomString = Math.random().toString(36).substring(2, 15); // Random string
    const uuid = uuidv4(); // Generate a UUID
    const fileExtension = originalFileName.split('.').pop(); // Extract file extension
    // Combine timestamp, random string, UUID, and file extension to create a unique name
    const uniqueFileName = `${randomString}_${timestamp}_${uuid}.${fileExtension}`;
  
    return uniqueFileName;
  }