export interface Photo {
  id: string;
  title: string;
  location: string;
  date: string;
  category: string;
  collectionId: string;
  tags: string[];
  aspectRatio: 'landscape' | 'portrait' | 'square';
  description?: string;
  species?: string;
  observation?: string;
  exif?: ExifData;
  imagePath?: string;
  placeholder: PlaceholderStyle;
}

export interface ExifData {
  camera?: string;
  lens?: string;
  shutterSpeed?: string;
  aperture?: string;
  iso?: string;
}

export interface PlaceholderStyle {
  bgColor: string;
  label: string;
}

export interface Collection {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage?: string;
  coverPlaceholder: PlaceholderStyle;
  photoCount: number;
}

export interface HeroConfig {
  imagePath?: string;
  kicker: string;
  title: string;
  subtitle: string;
}
