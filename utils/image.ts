import { StrapiImage, StrapiImageFormat } from "@/interfaces/strapi";

type StrapiImageFormatKey = "thumbnail" | "small" | "medium" | "large";

const PRECEDENCE: StrapiImageFormatKey[] = ["thumbnail", "small", "medium", "large"];
/**
 * Get the desired image format data from the image. If the desired format is not available,
 * return the next largest available format in the precedence order, or the next smallest format if no larger format is available.
 * @param image - The image to get the format data for.
 * @param format - The format to get the data for.
 * @returns The format data.
 * @throws If the format is invalid
 */
export function getDesiredImageFormatData(
  image: StrapiImage,
  format: StrapiImageFormatKey
): StrapiImageFormat {
  if (!image) throw new Error("No image provided");
  const formats = image.formats ?? {};
  const start = PRECEDENCE.indexOf(format);

  if (start === -1) throw new Error(`Image format ${format} not found`);

  // 1) exact
  if (formats[format]) return formats[format];

  // 2) next larger
  for (let i = start + 1; i < PRECEDENCE.length; i++) {
    const key = PRECEDENCE[i];
    if (formats[key]) return formats[key];
  }

  // 3) next smaller
  for (let i = start - 1; i >= 0; i--) {
    const key = PRECEDENCE[i];
    if (formats[key]) return formats[key];
  }

  throw new Error("No image formats available");
}
