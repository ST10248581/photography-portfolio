import { Photo } from '../models/photo.model';

const placeholderColors: Record<string, string> = {
  wildlife: '#2a3a2e',
  'wild-durban': '#2e3a3a',
  landscapes: '#1e2a30',
  macro: '#30292a',
  coastal: '#1e2830',
};

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
  // Wildlife & Animals
  makePhoto('w_elephant', 'African Elephant', 'wildlife', {
    location: 'Midlands, KwaZulu-Natal',
    date: '2021',
    tags: ['mammals'],
    aspectRatio: 'landscape',
    species: 'Loxodonta africana',
    description: 'African elephant grazing in the KwaZulu-Natal Midlands.',
    imagePath: 'assets/photos/wildlife/african-elephant.jpg',
    exif: {
      camera: 'Canon EOS 1000D',
      lens: '45mm',
      shutterSpeed: '1/125',
      aperture: 'f/6.9',
      iso: 'ISO 200',
    },
  }),
  makePhoto('w0', 'Krantzkloof River', 'wildlife', {
    location: 'Krantzkloof Nature Reserve',
    date: '2021',
    tags: ['landscape', 'water'],
    aspectRatio: 'landscape',
    description: 'River running through the Krantzkloof Nature Reserve.',
    imagePath: 'assets/photos/wildlife/krantzkloof-river.jpg',
    exif: {
      camera: 'Canon EOS 1000D',
      lens: '18mm',
      shutterSpeed: '1/100',
      aperture: 'f/13',
      iso: 'ISO 200',
    },
  }),
  makePhoto('w1', 'Black-backed Puffback', 'wildlife', {
    location: 'Durban',
    date: '2026',
    tags: ['birds'],
    aspectRatio: 'landscape',
    species: 'Dryoscopus cubla',
    observation: 'Foraging in the garden canopy, moving quickly between branches.',
  }),
  makePhoto('w2', 'Spotted Bush Snake', 'wildlife', {
    location: 'Krantzkloof',
    tags: ['reptiles'],
    aspectRatio: 'portrait',
    species: 'Philothamnus semivariegatus',
  }),
  makePhoto('w3', 'Golden Orb Weaver', 'wildlife', {
    location: 'Durban North',
    tags: ['insects'],
    aspectRatio: 'square',
    species: 'Nephila senegalensis',
  }),
  makePhoto('w4', 'Vervet Monkey Portrait', 'wildlife', {
    location: 'Umhlanga',
    tags: ['mammals'],
    aspectRatio: 'portrait',
    species: 'Chlorocebus pygerythrus',
  }),
  makePhoto('w5', 'Hadeda at Dawn', 'wildlife', {
    location: 'Westville',
    tags: ['birds'],
    aspectRatio: 'landscape',
    species: 'Bostrychia hagedash',
  }),
  makePhoto('w6', 'Garden Skink', 'wildlife', {
    location: 'Hillcrest',
    tags: ['reptiles'],
    aspectRatio: 'landscape',
    species: 'Trachylepis striata',
  }),
  makePhoto('w7', 'Painted Lady', 'wildlife', {
    location: 'Palmiet Nature Reserve',
    tags: ['insects'],
    aspectRatio: 'square',
    species: 'Vanessa cardui',
  }),
  makePhoto('w8', 'Dark-capped Bulbul', 'wildlife', {
    location: 'Durban',
    tags: ['birds'],
    aspectRatio: 'landscape',
    species: 'Pycnonotus tricolor',
  }),
  makePhoto('w9', 'Flap-necked Chameleon', 'wildlife', {
    location: 'Kloof',
    tags: ['reptiles'],
    aspectRatio: 'portrait',
    species: 'Chamaeleo dilepis',
    observation: 'Found crossing the road after light rain.',
  }),
  makePhoto('w10', 'Sunbird on Aloe', 'wildlife', {
    location: 'Durban Botanic Gardens',
    tags: ['birds'],
    aspectRatio: 'portrait',
  }),
  makePhoto('w11', 'Praying Mantis', 'wildlife', {
    location: 'Westville',
    tags: ['insects'],
    aspectRatio: 'square',
  }),
  makePhoto('w12', 'Thick-tailed Bushbaby', 'wildlife', {
    location: 'Kloof',
    tags: ['mammals'],
    aspectRatio: 'landscape',
    species: 'Otolemur crassicaudatus',
    observation: 'Brief sighting in the tree canopy at dusk.',
  }),

  // Wild Durban
  makePhoto('wd1', 'Spotted Thick-knee', 'wild-durban', {
    location: 'Durban Beachfront',
    tags: ['birds'],
    aspectRatio: 'landscape',
    species: 'Burhinus capensis',
    observation: 'Nesting on open ground near the promenade.',
  }),
  makePhoto('wd2', 'Water Monitor', 'wild-durban', {
    location: 'Umgeni River',
    tags: ['reptiles'],
    aspectRatio: 'landscape',
    species: 'Varanus niloticus',
  }),
  makePhoto('wd3', 'Painted Reed Frog', 'wild-durban', {
    location: 'Beachwood Mangroves',
    tags: ['amphibians'],
    aspectRatio: 'square',
    species: 'Hyperolius marmoratus',
  }),
  makePhoto('wd4', 'Monkey in the Suburbs', 'wild-durban', {
    location: 'Berea',
    tags: ['mammals'],
    aspectRatio: 'portrait',
  }),
  makePhoto('wd5', 'Ghost Crab', 'wild-durban', {
    location: 'uMhlanga Rocks',
    tags: ['marine'],
    aspectRatio: 'square',
  }),
  makePhoto('wd6', 'Emerald-spotted Wood Dove', 'wild-durban', {
    location: 'Burman Bush',
    tags: ['birds'],
    aspectRatio: 'landscape',
    species: 'Turtur chalcospilos',
  }),
  makePhoto('wd7', 'Urban Weaver Nests', 'wild-durban', {
    location: 'Durban CBD',
    tags: ['birds'],
    aspectRatio: 'portrait',
    observation: 'Colony building nests on traffic lights.',
  }),
  makePhoto('wd8', 'Bark Spider Web', 'wild-durban', {
    location: 'Virginia Bush',
    tags: ['insects'],
    aspectRatio: 'landscape',
  }),
  makePhoto('wd9', 'Mangrove Roots', 'wild-durban', {
    location: 'Beachwood Mangroves',
    tags: ['coast'],
    aspectRatio: 'portrait',
  }),
  makePhoto('wd10', 'Night Adder Crossing', 'wild-durban', {
    location: 'Westville',
    tags: ['reptiles'],
    aspectRatio: 'landscape',
    species: 'Causus rhombeatus',
  }),

  // Moody Landscapes
  makePhoto('ml1', 'Fog Over the Valley', 'landscapes', {
    location: 'Botha\'s Hill',
    tags: ['fog', 'forest'],
    aspectRatio: 'landscape',
    description: 'Early morning fog settling into the Valley of a Thousand Hills.',
  }),
  makePhoto('ml2', 'Storm Front', 'landscapes', {
    location: 'Durban Beachfront',
    tags: ['storms', 'coast'],
    aspectRatio: 'landscape',
  }),
  makePhoto('ml3', 'Empty Road', 'landscapes', {
    location: 'Midlands',
    tags: ['roads'],
    aspectRatio: 'landscape',
  }),
  makePhoto('ml4', 'Dark Forest', 'landscapes', {
    location: 'Krantzkloof',
    tags: ['forest'],
    aspectRatio: 'portrait',
    description: 'Dense canopy blocking most of the light.',
  }),
  makePhoto('ml5', 'Overcast Beach', 'landscapes', {
    location: 'Scottburgh',
    tags: ['coast', 'overcast'],
    aspectRatio: 'landscape',
  }),
  makePhoto('ml6', 'Mountain Silhouette', 'landscapes', {
    location: 'Drakensberg',
    tags: ['mountains'],
    aspectRatio: 'landscape',
  }),
  makePhoto('ml7', 'Reflections', 'landscapes', {
    location: 'Midmar Dam',
    tags: ['water'],
    aspectRatio: 'landscape',
  }),
  makePhoto('ml8', 'Last Light', 'landscapes', {
    location: 'Umhlanga',
    tags: ['coast'],
    aspectRatio: 'portrait',
    description: 'Final moments of light before the cloud cover closed in completely.',
  }),

  // Macro / Tiny Worlds
  makePhoto('mc1', 'Jumping Spider Portrait', 'macro', {
    location: 'Durban',
    tags: ['spiders'],
    aspectRatio: 'square',
  }),
  makePhoto('mc2', 'Moth on Glass', 'macro', {
    location: 'Westville',
    tags: ['moths'],
    aspectRatio: 'portrait',
  }),
  makePhoto('mc3', 'Foam Nest Frog', 'macro', {
    location: 'Palmiet',
    tags: ['frogs'],
    aspectRatio: 'square',
    species: 'Chiromantis xerampelina',
  }),
  makePhoto('mc4', 'Bark Texture', 'macro', {
    location: 'Kloof',
    tags: ['details'],
    aspectRatio: 'portrait',
  }),
  makePhoto('mc5', 'Dragonfly Wings', 'macro', {
    location: 'Umgeni River',
    tags: ['insects'],
    aspectRatio: 'landscape',
  }),
  makePhoto('mc6', 'Tiny Gecko', 'macro', {
    location: 'Durban North',
    tags: ['reptiles'],
    aspectRatio: 'square',
  }),
  makePhoto('mc7', 'Crab Spider on Flower', 'macro', {
    location: 'Botanic Gardens',
    tags: ['spiders'],
    aspectRatio: 'square',
  }),
  makePhoto('mc8', 'Rain Drops on Leaf', 'macro', {
    location: 'Hillcrest',
    tags: ['details'],
    aspectRatio: 'landscape',
  }),
  makePhoto('mc9', 'Millipede', 'macro', {
    location: 'Krantzkloof',
    tags: ['insects'],
    aspectRatio: 'landscape',
  }),

  // Coastal / Fishing
  makePhoto('cf1', 'Before Sunrise', 'coastal', {
    location: 'Umhlanga Pier',
    tags: ['coast', 'fishing'],
    aspectRatio: 'landscape',
    description: 'Fishermen setting up before first light.',
  }),
  makePhoto('cf2', 'Rod and Reel', 'coastal', {
    location: 'Durban Pier',
    tags: ['fishing'],
    aspectRatio: 'portrait',
  }),
  makePhoto('cf3', 'Rock Pool Life', 'coastal', {
    location: 'Ballito',
    tags: ['coast', 'marine'],
    aspectRatio: 'square',
  }),
  makePhoto('cf4', 'Wet Hands', 'coastal', {
    location: 'Scottburgh',
    tags: ['fishing'],
    aspectRatio: 'portrait',
    description: 'Hands covered in bait and salt water.',
  }),
  makePhoto('cf5', 'Breaking Waves', 'coastal', {
    location: 'Umhlanga',
    tags: ['coast'],
    aspectRatio: 'landscape',
  }),
  makePhoto('cf6', 'The Boat', 'coastal', {
    location: 'Durban Harbour',
    tags: ['coast', 'fishing'],
    aspectRatio: 'landscape',
  }),
  makePhoto('cf7', 'Bait Preparation', 'coastal', {
    location: 'Isipingo Beach',
    tags: ['fishing'],
    aspectRatio: 'square',
  }),
  makePhoto('cf8', 'Fishing at Dusk', 'coastal', {
    location: 'Amanzimtoti',
    tags: ['fishing', 'coast'],
    aspectRatio: 'landscape',
  }),
  makePhoto('cf9', 'Barnacles', 'coastal', {
    location: 'Ballito',
    tags: ['coast', 'marine'],
    aspectRatio: 'square',
  }),
  makePhoto('cf10', 'The Catch', 'coastal', {
    location: 'Durban Pier',
    tags: ['fishing'],
    aspectRatio: 'portrait',
  }),
  makePhoto('cf11', 'Misty Morning Shore', 'coastal', {
    location: 'Umkomaas',
    tags: ['coast'],
    aspectRatio: 'landscape',
    description: 'Heavy mist sitting on the water at dawn.',
  }),
];

// Photos curated for homepage selected work section
export const SELECTED_WORK_IDS = [
  'w_elephant', 'w1', 'ml1', 'cf1', 'wd1', 'mc1', 'ml4', 'cf4', 'w4', 'wd7',
];
