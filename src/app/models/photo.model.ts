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
  /** Id of a PhotoGroup — set on photos of the same subject so they show as one collage tile. */
  groupId?: string;
}

/** A sub-collection: several frames of the same animal, species or scene. */
export interface PhotoGroup {
  id: string;
  title: string;
  collectionId: string;
  description?: string;
}

/** One cell on a collection page — either a single photo or a group collage. */
export type GridItem =
  | { kind: 'photo'; photo: Photo }
  | { kind: 'group'; group: PhotoGroup; photos: Photo[] };

export interface ExifData {
  camera?: string;
  lens?: string;
  shutterSpeed?: string;
  aperture?: string;
  iso?: string;
  focalLength?: string;
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
  /** CSS object-position for the cover, when the default crop misses the subject. */
  coverPosition?: string;
  coverPlaceholder: PlaceholderStyle;
  photoCount: number;
}

export interface HeroConfig {
  imagePath?: string;
  kicker: string;
  title: string;
  subtitle: string;
}
