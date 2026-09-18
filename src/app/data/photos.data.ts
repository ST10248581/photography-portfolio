import { Photo } from '../models/photo.model';

const placeholderColors: Record<string, string> = {
  wildlife: '#2a3a2e',
  'wild-durban': '#2e3a3a',
  landscapes: '#1e2a30',
  macro: '#30292a',
  coastal: '#1e2830',
};

// Every frame below was shot on the same body; lenses differ per outing.
const BODY = 'Canon EOS 1000D';
const TELE = 'EF 28-80mm f/3.5-5.6';
const WIDE = 'EF-S 18-55mm f/3.5-5.6 IS';

function makePhoto(
  id: string,
  title: string,
  collectionId: string,
  opts: Partial<Photo> = {}
): Photo {
  return {
    id,
    title,
    location: opts.location || 'KwaZulu-Natal',
    date: opts.date || '2026',
    category: opts.category || collectionId,
    collectionId,
    tags: opts.tags || [],
    aspectRatio: opts.aspectRatio || 'landscape',
    description: opts.description,
    species: opts.species,
    observation: opts.observation,
    exif: opts.exif || {
      camera: 'Camera Body',
      lens: '100-400mm f/4.5-6.3',
      shutterSpeed: '1/1000',
      aperture: 'f/5.6',
      iso: 'ISO 400',
    },
    imagePath: opts.imagePath,
    placeholder: {
      bgColor: opts.placeholder?.bgColor || placeholderColors[collectionId] || '#2a2522',
      label: opts.placeholder?.label || title,
    },
  };
}

export const PHOTOS: Photo[] = [
  // ---------------------------------------------------------------------
  // Wildlife & Animals
  // Lions and elephants: Lion Park, KZN Midlands, 2 January 2021.
  // Raptors: Raptor Rescue, KZN Midlands, same day.
  // ---------------------------------------------------------------------
  makePhoto('w_lion_mist', 'Lion in the Mist', 'wildlife', {
    location: 'Lion Park, KwaZulu-Natal Midlands',
    date: '2021',
    tags: ['mammals', 'big cats'],
    aspectRatio: 'landscape',
    species: 'Panthera leo',
    description: 'Male lion standing in wet grass with the Midlands hills fogged in behind him.',
    observation: 'Heavy mist all morning — he held this position just long enough.',
    imagePath: 'assets/photos/wildlife/IMG_4358.JPG',
    exif: { camera: BODY, lens: TELE, shutterSpeed: '1/320', aperture: 'f/5.6', iso: 'ISO 800' },
  }),
  makePhoto('w_lioness', 'Lioness at Rest', 'wildlife', {
    location: 'Lion Park, KwaZulu-Natal Midlands',
    date: '2021',
    tags: ['mammals', 'big cats'],
    aspectRatio: 'landscape',
    species: 'Panthera leo',
    description: 'Lioness lying up in long summer grass, a second cat just visible behind her.',
    imagePath: 'assets/photos/wildlife/IMG_4370~2.JPG',
    exif: { camera: BODY, lens: TELE },
  }),
  makePhoto('w_white_lioness', 'White Lioness', 'wildlife', {
    location: 'Lion Park, KwaZulu-Natal Midlands',
    date: '2021',
    tags: ['mammals', 'big cats'],
    aspectRatio: 'landscape',
    species: 'Panthera leo',
    description: 'A white lioness sitting up in the grass while the male feeds behind her.',
    observation: 'She watched the vehicle the whole time the male ignored it.',
    imagePath: 'assets/photos/wildlife/IMG_4385~2.JPG',
    exif: { camera: BODY, lens: TELE },
  }),
  makePhoto('w_elephant', 'African Elephant', 'wildlife', {
    location: 'Lion Park, KwaZulu-Natal Midlands',
    date: '2021',
    tags: ['mammals'],
    aspectRatio: 'landscape',
    species: 'Loxodonta africana',
    description: 'Bull elephant feeding, a second animal behind him in the grass.',
    imagePath: 'assets/photos/wildlife/IMG_4397.CR2.jpg',
    exif: { camera: BODY, lens: TELE, aperture: 'f/6.9', iso: 'ISO 200' },
  }),
  makePhoto('w_goshawk', 'African Goshawk', 'wildlife', {
    location: 'Raptor Rescue, KwaZulu-Natal Midlands',
    date: '2021',
    tags: ['birds', 'raptors'],
    aspectRatio: 'landscape',
    species: 'Accipiter tachiro',
    description: 'Goshawk mantling on the glove, barred underparts caught against the hills.',
    observation: 'A rehabilitation bird — flown daily as part of its conditioning.',
    imagePath: 'assets/photos/wildlife/IMG_4411~2.JPG',
    exif: { camera: BODY, lens: TELE },
  }),
  makePhoto('w_wood_owl', 'African Wood Owl', 'wildlife', {
    location: 'Raptor Rescue, KwaZulu-Natal Midlands',
    date: '2021',
    tags: ['birds', 'owls'],
    aspectRatio: 'landscape',
    species: 'Strix woodfordii',
    description: 'Wood owl looking straight down the lens, dark eyes and orange bill.',
    imagePath: 'assets/photos/wildlife/IMG_4417.JPG',
    exif: { camera: BODY, lens: TELE, shutterSpeed: '1/100', aperture: 'f/5.6', iso: 'ISO 200' },
  }),
  makePhoto('w_snake_eagle', 'Snake Eagle', 'wildlife', {
    location: 'Raptor Rescue, KwaZulu-Natal Midlands',
    date: '2021',
    tags: ['birds', 'raptors'],
    aspectRatio: 'landscape',
    species: 'Circaetus sp.',
    description: 'Snake eagle perched in the enclosure, that oversized yellow eye fixed on the camera.',
    imagePath: 'assets/photos/wildlife/IMG_4436.JPG',
    exif: { camera: BODY, lens: TELE, shutterSpeed: '1/100', aperture: 'f/5.6', iso: 'ISO 320' },
  }),
  makePhoto('w_fish_eagle', 'African Fish Eagle', 'wildlife', {
    location: 'Raptor Rescue, KwaZulu-Natal Midlands',
    date: '2021',
    tags: ['birds', 'raptors'],
    aspectRatio: 'square',
    species: 'Haliaeetus vocifer',
    description: 'Fish eagle in profile — the bird everyone in this country knows by its call.',
    imagePath: 'assets/photos/wildlife/IMG_4439.JPG',
    exif: { camera: BODY, lens: TELE, shutterSpeed: '1/100', aperture: 'f/5.6', iso: 'ISO 250' },
  }),
  makePhoto('w_eagle_owl', 'Spotted Eagle-Owl', 'wildlife', {
    location: 'Raptor Rescue, KwaZulu-Natal Midlands',
    date: '2021',
    tags: ['birds', 'owls'],
    aspectRatio: 'landscape',
    species: 'Bubo africanus',
    description: 'Eagle-owl dozing on a perch, ear tufts up, eyes shut against the afternoon light.',
    imagePath: 'assets/photos/wildlife/IMG_4448.JPG',
    exif: { camera: BODY, lens: TELE, shutterSpeed: '1/100', aperture: 'f/5.6', iso: 'ISO 400' },
  }),
  makePhoto('w_vulture_face', 'Cape Vulture', 'wildlife', {
    location: 'Raptor Rescue, KwaZulu-Natal Midlands',
    date: '2021',
    tags: ['birds', 'raptors'],
    aspectRatio: 'landscape',
    species: 'Gyps coprotheres',
    description: 'Cape vulture head-on, staring the lens down.',
    observation: 'Endemic to southern Africa and endangered — the rescue keeps several.',
    imagePath: 'assets/photos/wildlife/IMG_4458.JPG',
    exif: { camera: BODY, lens: TELE, shutterSpeed: '1/100', aperture: 'f/5.6', iso: 'ISO 500' },
  }),
  makePhoto('w_vulture_profile', 'Cape Vulture, Profile', 'wildlife', {
    location: 'Raptor Rescue, KwaZulu-Natal Midlands',
    date: '2021',
    tags: ['birds', 'raptors'],
    aspectRatio: 'landscape',
    species: 'Gyps coprotheres',
    description: 'The same bird turned side-on, bill and neck against the green of the enclosure.',
    imagePath: 'assets/photos/wildlife/IMG_4460.JPG',
    exif: { camera: BODY, lens: TELE, shutterSpeed: '1/100', aperture: 'f/5.6', iso: 'ISO 500' },
  }),

  // ---------------------------------------------------------------------
  // Moody Landscapes — Krantzkloof Nature Reserve, 6 July 2021
  // ---------------------------------------------------------------------
  makePhoto('ml_river', 'Krantzkloof River', 'landscapes', {
    location: 'Krantzkloof Nature Reserve',
    date: '2021',
    tags: ['water', 'forest'],
    aspectRatio: 'landscape',
    description: 'The river opening out below the falls, early winter sun coming through the canopy.',
    imagePath: 'assets/photos/landscapes/PSX_20210706_175015.jpg',
    exif: { camera: BODY, lens: WIDE, shutterSpeed: '1/100', aperture: 'f/13', iso: 'ISO 200' },
  }),
  makePhoto('ml_falls', 'Water Over the Ledges', 'landscapes', {
    location: 'Krantzkloof Nature Reserve',
    date: '2021',
    tags: ['water', 'rock'],
    aspectRatio: 'square',
    description: 'Winter flow spilling down the stepped sandstone face in a dozen separate threads.',
    imagePath: 'assets/photos/landscapes/PSX_20210706_174753.jpg',
    exif: { camera: BODY, lens: WIDE, shutterSpeed: '1/50', aperture: 'f/5.6', iso: 'ISO 100' },
  }),
  makePhoto('ml_stream', 'Forest Stream', 'landscapes', {
    location: 'Krantzkloof Nature Reserve',
    date: '2021',
    tags: ['water', 'forest'],
    aspectRatio: 'landscape',
    description: 'Shallow stream running over moss-covered rock, tree ferns crowding both banks.',
    imagePath: 'assets/photos/landscapes/PSX_20210706_174229.jpg',
    exif: { camera: BODY, lens: WIDE, shutterSpeed: '1/25', aperture: 'f/5.6', iso: 'ISO 400' },
  }),
  makePhoto('ml_path_dark', 'Into the Dark', 'landscapes', {
    location: 'Krantzkloof Nature Reserve',
    date: '2021',
    tags: ['forest', 'trails'],
    aspectRatio: 'portrait',
    description: 'The trail narrowing into a tunnel of branches, one patch of light at the far end.',
    imagePath: 'assets/photos/landscapes/PSX_20210706_173728.jpg',
    exif: { camera: BODY, lens: WIDE, shutterSpeed: '1/10', aperture: 'f/11', iso: 'ISO 800' },
  }),
  makePhoto('ml_path_open', 'Trail Through the Ferns', 'landscapes', {
    location: 'Krantzkloof Nature Reserve',
    date: '2021',
    tags: ['forest', 'trails'],
    aspectRatio: 'landscape',
    description: 'The same path further on, where the canopy opens and the ferns take over.',
    imagePath: 'assets/photos/landscapes/PSX_20210706_174518.jpg',
    exif: { camera: BODY, lens: WIDE, shutterSpeed: '1/13', aperture: 'f/5.6', iso: 'ISO 800' },
  }),

  // ---------------------------------------------------------------------
  // Coastal / Fishing — Ballito, KZN North Coast, 2-3 July 2021
  // ---------------------------------------------------------------------
  makePhoto('cf_rocks_bw', 'Rocks and Surf', 'coastal', {
    location: 'Ballito, KwaZulu-Natal',
    date: '2021',
    tags: ['coast', 'monochrome'],
    aspectRatio: 'landscape',
    description: 'Barnacled rock shelf with the swell washing through it, shot long and converted to mono.',
    imagePath: 'assets/photos/landscapes/IMG_4684.JPG',
    exif: { camera: BODY, lens: TELE, shutterSpeed: '1/20', aperture: 'f/29', iso: 'ISO 100' },
  }),
  makePhoto('cf_break', 'Break on the Rock', 'coastal', {
    location: 'Ballito, KwaZulu-Natal',
    date: '2021',
    tags: ['coast', 'monochrome'],
    aspectRatio: 'landscape',
    description: 'A wave detonating against the one rock standing clear of the pool.',
    imagePath: 'assets/photos/landscapes/IMG_4691.JPG',
    exif: { camera: BODY, lens: TELE, shutterSpeed: '1/200', aperture: 'f/8', iso: 'ISO 100' },
  }),
  makePhoto('cf_lagoon', 'Lagoon at Low Light', 'coastal', {
    location: 'Ballito, KwaZulu-Natal',
    date: '2021',
    tags: ['coast', 'monochrome', 'water'],
    aspectRatio: 'landscape',
    description: 'Still lagoon water holding the reflection of the houses on the bank above.',
    imagePath: 'assets/photos/landscapes/PSX_20210705_224024.jpg',
    exif: { camera: BODY, lens: TELE, shutterSpeed: '1/30', aperture: 'f/18', iso: 'ISO 400' },
  }),
  makePhoto('cf_dusk_1', 'Flat Sea at Dusk', 'coastal', {
    location: 'Ballito, KwaZulu-Natal',
    date: '2021',
    tags: ['coast', 'minimal'],
    aspectRatio: 'landscape',
    description: 'Nothing but water and a warm band of sky where the sun has already gone.',
    imagePath: 'assets/photos/landscapes/IMG_4726.JPG',
    exif: { camera: BODY, lens: TELE, shutterSpeed: '1/200', aperture: 'f/10', iso: 'ISO 100' },
  }),
  makePhoto('cf_dusk_2', 'Last Colour', 'coastal', {
    location: 'Ballito, KwaZulu-Natal',
    date: '2021',
    tags: ['coast', 'minimal'],
    aspectRatio: 'landscape',
    description: 'Two seconds later — the swell rolling in under the last of the colour.',
    imagePath: 'assets/photos/landscapes/IMG_4727.JPG',
    exif: { camera: BODY, lens: TELE, shutterSpeed: '1/200', aperture: 'f/10', iso: 'ISO 100' },
  }),
];

// Photos curated for homepage selected work section
export const SELECTED_WORK_IDS = [
  'w_lion_mist',
  'ml_river',
  'w_fish_eagle',
  'cf_break',
  'w_elephant',
  'ml_falls',
  'w_wood_owl',
  'cf_dusk_1',
  'w_white_lioness',
  'ml_path_dark',
  'w_vulture_face',
  'cf_rocks_bw',
];
