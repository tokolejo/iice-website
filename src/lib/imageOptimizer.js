/**
 * Client-side Image Optimization Utility
 * Automatically compresses and scales images to WebP before uploading to Supabase Storage.
 * Prevents multi-megabyte uploads, speeds up upload times, and saves storage quota.
 */

export async function optimizeImage(file, options = {}) {
    // If not in browser or not a valid image, return as is
    if (typeof window === 'undefined' || !file || !(file instanceof File)) {
        return file;
    }

    // Skip SVGs, GIFs (which might be animated), or small files under 250KB
    if (file.type === 'image/svg+xml' || file.type === 'image/gif' || file.size < 250 * 1024) {
        return file;
    }

    const {
        maxWidth = 2048,
        maxHeight = 2048,
        quality = 0.85,
        outputType = 'image/webp'
    } = options;

    return new Promise((resolve) => {
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);

        img.onload = () => {
            URL.revokeObjectURL(objectUrl);

            let { width, height } = img;

            // Calculate proportional dimensions
            if (width > maxWidth || height > maxHeight) {
                const ratio = Math.min(maxWidth / width, maxHeight / height);
                width = Math.round(width * ratio);
                height = Math.round(height * ratio);
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            if (!ctx) {
                return resolve(file);
            }

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
                (blob) => {
                    if (!blob || blob.size >= file.size) {
                        // If optimization didn't reduce size, keep original
                        return resolve(file);
                    }

                    const originalBaseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
                    const extension = outputType === 'image/webp' ? 'webp' : 'jpg';
                    const newFileName = `${originalBaseName}.${extension}`;

                    const optimizedFile = new File([blob], newFileName, {
                        type: outputType,
                        lastModified: Date.now()
                    });

                    resolve(optimizedFile);
                },
                outputType,
                quality
            );
        };

        img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            resolve(file); // Fallback to original on error
        };

        img.src = objectUrl;
    });
}

/**
 * Optimizes an array of image files in parallel
 */
export async function optimizeImages(files = [], options = {}) {
    return Promise.all(files.map((file) => optimizeImage(file, options)));
}
