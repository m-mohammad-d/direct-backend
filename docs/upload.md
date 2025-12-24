# Upload Module

This module handles image uploads and integration with **Cloudinary** for storage.  
It ensures temporary file handling, validation, and secure uploads.

It uses:

- **Express.js**: for routing and middleware
- **Multer**: for handling multipart/form-data
- **Cloudinary**: for cloud image storage
- **fs**: for temporary file cleanup

---

## Table of Contents

- [API Endpoints](#api-endpoints)
- [Middleware](#middleware)
- [Controllers](#controllers)
- [Services](#services)
- [Error Handling](#error-handling)

---

## API Endpoints

| Method | Route     | Description           |
| ------ | --------- | --------------------- |
| POST   | `/upload` | Upload a single image |

All routes are protected by `authMiddleware`.

---

## Middleware

### `upload` (Multer)

- Stores uploaded files temporarily in `tmp/` folder
- Limits file size to **5MB**
- Only allows image MIME types (`image/*`)
- Renames files to timestamp-based names to avoid collisions

---

## Controllers

### `uploadImageController(req, res)`

- Handles the uploaded file from the request
- Calls `uploadImage` service to upload the file to Cloudinary
- Deletes temporary file from `tmp/` directory after upload
- Returns uploaded image information:

```json
{
  "status": "success",
  "data": {
    "url": "https://res.cloudinary.com/.../image.jpg",
    "publicId": "app/image.jpg"
  }
}
```

---

## Services

### `uploadImage(filePath, folder)`

- Uploads an image file to Cloudinary
- `filePath`: local path to temporary file
- `folder`: optional folder name in Cloudinary (default `"app"`)
- Returns:

```ts
{
  url: string; // Secure URL of uploaded image
  publicId: string; // Cloudinary public ID
}
```

---

## Error Handling

- **400 Bad Request** → No file uploaded
- **Multer fileFilter error** → File is not an image
- All other Cloudinary or filesystem errors are thrown as exceptions

---

## Notes

- Temporary files are stored in `tmp/` folder and removed after upload
- Unique filenames are **not enforced**; original filename is preserved in Cloudinary
- `authMiddleware` ensures only authenticated users can upload images
