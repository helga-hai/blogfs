export interface SimpleImageFormat {
  ext: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  path: string;
  size: number;
  url: string;
  width: number;
}

export interface ImageFormats {
  large: SimpleImageFormat;
  medium: SimpleImageFormat;
  small: SimpleImageFormat;
  thumbnail: SimpleImageFormat;
}

export interface ImageFormat {
  alternativeText: string;
  caption: string;
  // eslint-disable-next-line camelcase
  created_at: string;
  ext: string;
  formats: ImageFormats;
  hash: string;
  height: number;
  id: number;
  mime: string;
  name: string;
  previewUrl: null;
  provider: string;
  // eslint-disable-next-line camelcase
  provider_metadata: null;
  size: number;
  // eslint-disable-next-line camelcase
  updated_at: string;
  url: string;
  width: number;
}

export interface PrevImage {
  id: number;
  photo: ImageFormat;
  photoWebp: ImageFormat;
}

export interface ImageInterface {
  id: 'string';
  name: 'string';
  alternativeText: 'string';
  caption: 'string';
  width: number;
  height: number;
  prevImage: PrevImage;
  hash: 'string';
  ext: 'string';
  mime: 'string';
  size: number;
  url: 'string';
  previewUrl: 'string';
  provider: 'string';
  // eslint-disable-next-line camelcase
  provider_metadata: any;
  related: 'string';
  // eslint-disable-next-line camelcase
  created_by: 'string';
  // eslint-disable-next-line camelcase
  updated_by: 'string';
}
