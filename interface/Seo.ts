import { ImageInterface } from './ImageInterface';

interface SaredImage {
  id: number;
  alt: string;
  media: ImageInterface;
}

export interface Seo {
  id: number;
  metaDescription: string;
  metaTitle: string;
  sharedImage: SaredImage;
}
