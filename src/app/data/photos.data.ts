import { Photo } from '../models/photo.model';

const placeholderColors: Record<string, string> = {
  wildlife: '#2a3a2e',
  'wild-durban': '#2e3a3a',
  landscapes: '#1e2a30',
  macro: '#30292a',
  coastal: '#1e2830',
  people: '#332c26',
};

// Two bodies so far. Everything from 2021 is the 1000D; the September 2026
// Virginia Bush outing is the 2000D. All EXIF below is read off the files.
const D1000 = 'Canon EOS 1000D';
const D2000 = 'Canon EOS 2000D';

const EF_28_80 = 'EF 28-80mm f/3.5-5.6';
const EFS_18_55 = 'EF-S 18-55mm f/3.5-5.6 IS';
const EFS_18_55_III = 'EF-S 18-55mm f/3.5-5.6 III';
const EF_75_300 = 'EF 75-300mm f/4-5.6';

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
    exif: opts.exif,
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
    imagePath: 'assets/photos/wildlife/lion-in-the-mist.jpg',
    exif: { camera: D1000, lens: EF_28_80, shutterSpeed: '1/320', aperture: 'f/5.6', iso: 'ISO 800', focalLength: '70mm' },
  }),
  makePhoto('w_lioness', 'Lioness at Rest', 'wildlife', {
    location: 'Lion Park, KwaZulu-Natal Midlands',
    date: '2021',
    tags: ['mammals', 'big cats'],
    aspectRatio: 'landscape',
    species: 'Panthera leo',
    description: 'Lioness lying up in long summer grass, a second cat just visible behind her.',
    imagePath: 'assets/photos/wildlife/lioness-at-rest.jpg',
    exif: { camera: D1000, lens: EF_28_80 },
  }),
  makePhoto('w_white_lioness', 'White Lioness', 'wildlife', {
    location: 'Lion Park, KwaZulu-Natal Midlands',
    date: '2021',
    tags: ['mammals', 'big cats'],
    aspectRatio: 'landscape',
    species: 'Panthera leo',
    description: 'A white lioness sitting up in the grass while the male feeds behind her.',
    observation: 'She watched the vehicle the whole time the male ignored it.',
    imagePath: 'assets/photos/wildlife/white-lioness.jpg',
    exif: { camera: D1000, lens: EF_28_80 },
  }),
  makePhoto('w_elephant', 'African Elephant', 'wildlife', {
    location: 'Lion Park, KwaZulu-Natal Midlands',
    date: '2021',
    tags: ['mammals'],
    aspectRatio: 'landscape',
    species: 'Loxodonta africana',
    description: 'Bull elephant feeding, a second animal behind him in the grass.',
    imagePath: 'assets/photos/wildlife/african-elephant.jpg',
    exif: { camera: D1000, lens: EF_28_80, iso: 'ISO 200', focalLength: '45mm' },
  }),
  makePhoto('w_goshawk', 'African Goshawk', 'wildlife', {
    location: 'Raptor Rescue, KwaZulu-Natal Midlands',
    date: '2021',
    tags: ['birds', 'raptors'],
    aspectRatio: 'landscape',
    species: 'Accipiter tachiro',
    description: 'Goshawk mantling on the glove, barred underparts caught against the hills.',
    observation: 'A rehabilitation bird — flown daily as part of its conditioning.',
    imagePath: 'assets/photos/wildlife/african-goshawk.jpg',
    exif: { camera: D1000, lens: EF_28_80 },
  }),
  makePhoto('w_wood_owl', 'African Wood Owl', 'wildlife', {
    location: 'Raptor Rescue, KwaZulu-Natal Midlands',
    date: '2021',
    tags: ['birds', 'owls'],
    aspectRatio: 'landscape',
    species: 'Strix woodfordii',
    description: 'Wood owl looking straight down the lens, dark eyes and orange bill.',
    imagePath: 'assets/photos/wildlife/african-wood-owl.jpg',
    exif: { camera: D1000, lens: EF_28_80, shutterSpeed: '1/100', aperture: 'f/5.6', iso: 'ISO 200', focalLength: '80mm' },
  }),
  makePhoto('w_snake_eagle', 'Snake Eagle', 'wildlife', {
    location: 'Raptor Rescue, KwaZulu-Natal Midlands',
    date: '2021',
    tags: ['birds', 'raptors'],
    aspectRatio: 'landscape',
    species: 'Circaetus sp.',
    description: 'Snake eagle perched in the enclosure, that oversized yellow eye fixed on the camera.',
    imagePath: 'assets/photos/wildlife/snake-eagle.jpg',
    exif: { camera: D1000, lens: EF_28_80, shutterSpeed: '1/100', aperture: 'f/5.6', iso: 'ISO 320', focalLength: '80mm' },
  }),
  makePhoto('w_fish_eagle', 'African Fish Eagle', 'wildlife', {
    location: 'Raptor Rescue, KwaZulu-Natal Midlands',
    date: '2021',
    tags: ['birds', 'raptors'],
    aspectRatio: 'square',
    species: 'Haliaeetus vocifer',
    description: 'Fish eagle in profile — the bird everyone in this country knows by its call.',
    imagePath: 'assets/photos/wildlife/african-fish-eagle.jpg',
    exif: { camera: D1000, lens: EF_28_80, shutterSpeed: '1/100', aperture: 'f/5.6', iso: 'ISO 250', focalLength: '80mm' },
  }),
  makePhoto('w_eagle_owl', 'Spotted Eagle-Owl', 'wildlife', {
    location: 'Raptor Rescue, KwaZulu-Natal Midlands',
    date: '2021',
    tags: ['birds', 'owls'],
    aspectRatio: 'landscape',
    species: 'Bubo africanus',
    description: 'Eagle-owl dozing on a perch, ear tufts up, eyes shut against the afternoon light.',
    imagePath: 'assets/photos/wildlife/spotted-eagle-owl.jpg',
    exif: { camera: D1000, lens: EF_28_80, shutterSpeed: '1/100', aperture: 'f/5.6', iso: 'ISO 400', focalLength: '80mm' },
  }),
  makePhoto('w_vulture_face', 'Cape Vulture', 'wildlife', {
    location: 'Raptor Rescue, KwaZulu-Natal Midlands',
    date: '2021',
    tags: ['birds', 'raptors'],
    aspectRatio: 'landscape',
    species: 'Gyps coprotheres',
    description: 'Cape vulture head-on, staring the lens down.',
    observation: 'Endemic to southern Africa and endangered — the rescue keeps several.',
    imagePath: 'assets/photos/wildlife/cape-vulture.jpg',
    exif: { camera: D1000, lens: EF_28_80, shutterSpeed: '1/100', aperture: 'f/5.6', iso: 'ISO 500', focalLength: '80mm' },
  }),
  makePhoto('w_vulture_profile', 'Cape Vulture, Profile', 'wildlife', {
    location: 'Raptor Rescue, KwaZulu-Natal Midlands',
    date: '2021',
    tags: ['birds', 'raptors'],
    aspectRatio: 'landscape',
    species: 'Gyps coprotheres',
    description: 'The same bird turned side-on, bill and neck against the green of the enclosure.',
    imagePath: 'assets/photos/wildlife/cape-vulture-profile.jpg',
    exif: { camera: D1000, lens: EF_28_80, shutterSpeed: '1/100', aperture: 'f/5.6', iso: 'ISO 500', focalLength: '80mm' },
  }),

  // ---------------------------------------------------------------------
  // Wild Durban — Virginia Bush Nature Reserve, Durban North,
  // 19 September 2026. Coastal forest on the ridge, looking south over
  // the bay to the Bluff and the city.
  // ---------------------------------------------------------------------
  makePhoto('wd_bay_bluff', 'The Bay and the Bluff', 'wild-durban', {
    location: 'Virginia Bush Nature Reserve, Durban North',
    date: '2026',
    tags: ['coast', 'city', 'views'],
    aspectRatio: 'landscape',
    description:
      'The whole bay in one frame — surf running the length of the beachfront, the harbour cranes, the city stacked behind it, and the Bluff closing the far side with its lighthouse on top.',
    observation: 'Worth the climb. The reserve keeps this view to itself until you are almost on the edge.',
    imagePath: 'assets/photos/wild-durban/the-bay-and-the-bluff.jpg',
    exif: { camera: D2000, lens: EFS_18_55_III, shutterSpeed: '1/500', aperture: 'f/8', iso: 'ISO 100', focalLength: '55mm' },
  }),
  makePhoto('wd_ridge_view', 'Durban from the Ridge', 'wild-durban', {
    location: 'Virginia Bush Nature Reserve, Durban North',
    date: '2026',
    tags: ['coast', 'city', 'views', 'forest'],
    aspectRatio: 'landscape',
    description:
      'Canopy running unbroken down to the sea, with the city a thin grey band on the horizon. Bananas and wild figs in the foreground, high-rise thirty kilometres off.',
    imagePath: 'assets/photos/wild-durban/durban-from-the-ridge.jpg',
    exif: { camera: D2000, lens: EFS_18_55_III, shutterSpeed: '1/125', aperture: 'f/8', iso: 'ISO 100', focalLength: '18mm' },
  }),
  makePhoto('wd_cloud_canopy', 'Cloud over the Canopy', 'wild-durban', {
    location: 'Virginia Bush Nature Reserve, Durban North',
    date: '2026',
    tags: ['forest', 'sky', 'views'],
    aspectRatio: 'landscape',
    description:
      'Spring flush on the flat-crowned trees — that acid green only lasts a few weeks — under a sky building into afternoon cloud.',
    imagePath: 'assets/photos/wild-durban/cloud-over-the-canopy.jpg',
    exif: { camera: D2000, lens: EFS_18_55_III, shutterSpeed: '1/200', aperture: 'f/8', iso: 'ISO 100', focalLength: '18mm' },
  }),
  makePhoto('wd_sea_treetops', 'Sea Beyond the Treetops', 'wild-durban', {
    location: 'Virginia Bush Nature Reserve, Durban North',
    date: '2026',
    tags: ['coast', 'minimal', 'sky'],
    aspectRatio: 'landscape',
    description:
      'Mostly sky. The Indian Ocean flat to the horizon with two ships on it, and the last of the forest along the bottom edge.',
    imagePath: 'assets/photos/wild-durban/sea-beyond-the-treetops.jpg',
    exif: { camera: D2000, lens: EFS_18_55_III, shutterSpeed: '1/250', aperture: 'f/8', iso: 'ISO 100', focalLength: '55mm' },
  }),
  makePhoto('wd_fig_path', 'Fig over the Path', 'wild-durban', {
    location: 'Virginia Bush Nature Reserve, Durban North',
    date: '2026',
    tags: ['forest', 'trails'],
    aspectRatio: 'portrait',
    description:
      'A forked fig leaning right across the trail, the path running away under it into backlit understorey.',
    observation: 'Shot into the sun on purpose — the tree goes to silhouette and everything behind it lights up.',
    imagePath: 'assets/photos/wild-durban/fig-over-the-path.jpg',
    exif: { camera: D2000, lens: EFS_18_55_III, shutterSpeed: '1/160', aperture: 'f/8', iso: 'ISO 800', focalLength: '18mm' },
  }),
  makePhoto('wd_footbridge', 'Footbridge over the Stream', 'wild-durban', {
    location: 'Virginia Bush Nature Reserve, Durban North',
    date: '2026',
    tags: ['forest', 'trails'],
    aspectRatio: 'landscape',
    description:
      'Old timber footbridge gone grey and lichen-covered, carrying the trail and a water pipe across the gully. Red clay steps cut into the bank on the near side.',
    imagePath: 'assets/photos/wild-durban/footbridge-over-the-stream.jpg',
    exif: { camera: D2000, lens: EFS_18_55_III, shutterSpeed: '1/160', aperture: 'f/8', iso: 'ISO 3200', focalLength: '18mm' },
  }),
  makePhoto('wd_forest_track', 'Forest Track', 'wild-durban', {
    location: 'Virginia Bush Nature Reserve, Durban North',
    date: '2026',
    tags: ['forest', 'trails'],
    aspectRatio: 'square',
    description:
      'Two-track service road through the reserve, grassed over down the middle and closing in from both sides.',
    imagePath: 'assets/photos/wild-durban/forest-track.jpg',
    exif: { camera: D2000, lens: EF_75_300, shutterSpeed: '1/320', aperture: 'f/8', iso: 'ISO 1250', focalLength: '75mm' },
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
    imagePath: 'assets/photos/landscapes/krantzkloof-river.jpg',
    exif: { camera: D1000, lens: EFS_18_55, shutterSpeed: '1/100', aperture: 'f/13', iso: 'ISO 200', focalLength: '18mm' },
  }),
  makePhoto('ml_falls', 'Water Over the Ledges', 'landscapes', {
    location: 'Krantzkloof Nature Reserve',
    date: '2021',
    tags: ['water', 'rock'],
    aspectRatio: 'square',
    description: 'Winter flow spilling down the stepped sandstone face in a dozen separate threads.',
    imagePath: 'assets/photos/landscapes/water-over-the-ledges.jpg',
    exif: { camera: D1000, lens: EFS_18_55, shutterSpeed: '1/50', aperture: 'f/5.6', iso: 'ISO 100', focalLength: '27mm' },
  }),
  makePhoto('ml_stream', 'Forest Stream', 'landscapes', {
    location: 'Krantzkloof Nature Reserve',
    date: '2021',
    tags: ['water', 'forest'],
    aspectRatio: 'landscape',
    description: 'Shallow stream running over moss-covered rock, tree ferns crowding both banks.',
    imagePath: 'assets/photos/landscapes/forest-stream.jpg',
    exif: { camera: D1000, lens: EFS_18_55, shutterSpeed: '1/25', aperture: 'f/5.6', iso: 'ISO 400', focalLength: '24mm' },
  }),
  makePhoto('ml_path_dark', 'Into the Dark', 'landscapes', {
    location: 'Krantzkloof Nature Reserve',
    date: '2021',
    tags: ['forest', 'trails'],
    aspectRatio: 'portrait',
    description: 'The trail narrowing into a tunnel of branches, one patch of light at the far end.',
    imagePath: 'assets/photos/landscapes/into-the-dark.jpg',
    exif: { camera: D1000, lens: EFS_18_55, shutterSpeed: '1/10', aperture: 'f/11', iso: 'ISO 800', focalLength: '39mm' },
  }),
  makePhoto('ml_path_open', 'Trail Through the Ferns', 'landscapes', {
    location: 'Krantzkloof Nature Reserve',
    date: '2021',
    tags: ['forest', 'trails'],
    aspectRatio: 'landscape',
    description: 'The same path further on, where the canopy opens and the ferns take over.',
    imagePath: 'assets/photos/landscapes/trail-through-the-ferns.jpg',
    exif: { camera: D1000, lens: EFS_18_55, shutterSpeed: '1/13', aperture: 'f/5.6', iso: 'ISO 800', focalLength: '29mm' },
  }),

  // ---------------------------------------------------------------------
  // Macro / Tiny Worlds — Virginia Bush Nature Reserve, 19 September 2026.
  // A wet spring week; the forest floor was full of fungi.
  // ---------------------------------------------------------------------
  makePhoto('mc_canna', 'Indian Shot in Flower', 'macro', {
    location: 'Virginia Bush Nature Reserve, Durban North',
    date: '2026',
    tags: ['plants', 'flowers'],
    aspectRatio: 'landscape',
    species: 'Canna indica',
    description:
      'Red and orange canna flowers catching low side-light, with the round warty seed capsules that give the plant its name sitting green behind them.',
    observation: 'Naturalised here rather than indigenous — it has made itself thoroughly at home along the damp edges.',
    imagePath: 'assets/photos/macro/canna-indica.jpg',
    exif: { camera: D2000, lens: EF_75_300, shutterSpeed: '1/320', aperture: 'f/5.6', iso: 'ISO 250', focalLength: '75mm' },
  }),
  makePhoto('mc_brackets', 'Brackets on Deadwood', 'macro', {
    location: 'Virginia Bush Nature Reserve, Durban North',
    date: '2026',
    tags: ['fungi', 'forest'],
    aspectRatio: 'landscape',
    description:
      'A row of apricot-coloured brackets stepping up the side of a fallen trunk, groundcover pressing in from the right.',
    observation: 'Growing straight out of the bark along the length of the log — the whole trunk is being taken apart.',
    imagePath: 'assets/photos/macro/bracket-fungi-on-deadwood.jpg',
    exif: { camera: D2000, lens: EF_75_300, shutterSpeed: '1/160', aperture: 'f/8', iso: 'ISO 3200', focalLength: '75mm' },
  }),
  makePhoto('mc_toadstools', 'Yellow Toadstools', 'macro', {
    location: 'Virginia Bush Nature Reserve, Durban North',
    date: '2026',
    tags: ['fungi', 'forest'],
    aspectRatio: 'portrait',
    species: 'Leucocoprinus sp.',
    description:
      'Two sulphur-yellow caps pushed up through wet leaf litter, one open flat and one still folded shut.',
    observation: 'Identification is tentative — the yellow is unmistakable, the species less so.',
    imagePath: 'assets/photos/macro/yellow-toadstools.jpg',
    exif: { camera: D2000, lens: EFS_18_55_III, shutterSpeed: '1/125', aperture: 'f/5.6', iso: 'ISO 800', focalLength: '55mm' },
  }),
  makePhoto('mc_parasol', 'Parasol in the Leaf Litter', 'macro', {
    location: 'Virginia Bush Nature Reserve, Durban North',
    date: '2026',
    tags: ['fungi', 'forest'],
    aspectRatio: 'square',
    species: 'Lepiota sp.',
    description:
      'A small white dapperling standing alone in a whole hillside of brown leaves, dark centre to the cap, gills clean underneath.',
    observation: 'One of the small white parasols — genus is a fair guess, species would need a spore print.',
    imagePath: 'assets/photos/macro/parasol-in-the-leaf-litter.jpg',
    exif: { camera: D2000, lens: EF_75_300, shutterSpeed: '1/125', aperture: 'f/8', iso: 'ISO 3200', focalLength: '80mm' },
  }),
  makePhoto('mc_bonnets', 'Two Bonnets', 'macro', {
    location: 'Virginia Bush Nature Reserve, Durban North',
    date: '2026',
    tags: ['fungi', 'forest'],
    aspectRatio: 'square',
    species: 'Mycena sp.',
    description:
      'Two bonnet mushrooms no bigger than a shirt button, on threadlike stems among the sticks.',
    observation: 'You walk past a hundred of these for every one you notice.',
    imagePath: 'assets/photos/macro/two-bonnets.jpg',
    exif: { camera: D2000, lens: EF_75_300, shutterSpeed: '1/320', aperture: 'f/4.5', iso: 'ISO 3200', focalLength: '100mm' },
  }),

  // ---------------------------------------------------------------------
  // Coastal / Fishing — Ballito, KZN North Coast, 2-3 July 2021,
  // plus one from the Durban North ridge in September 2026.
  // ---------------------------------------------------------------------
  makePhoto('cf_rocks_bw', 'Rocks and Surf', 'coastal', {
    location: 'Ballito, KwaZulu-Natal',
    date: '2021',
    tags: ['coast', 'monochrome'],
    aspectRatio: 'landscape',
    description: 'Barnacled rock shelf with the swell washing through it, shot long and converted to mono.',
    imagePath: 'assets/photos/coastal/rocks-and-surf.jpg',
    exif: { camera: D1000, lens: EF_28_80, shutterSpeed: '1/20', aperture: 'f/29', iso: 'ISO 100', focalLength: '32mm' },
  }),
  makePhoto('cf_break', 'Break on the Rock', 'coastal', {
    location: 'Ballito, KwaZulu-Natal',
    date: '2021',
    tags: ['coast', 'monochrome'],
    aspectRatio: 'landscape',
    description: 'A wave detonating against the one rock standing clear of the pool.',
    imagePath: 'assets/photos/coastal/break-on-the-rock.jpg',
    exif: { camera: D1000, lens: EF_28_80, shutterSpeed: '1/200', aperture: 'f/8', iso: 'ISO 100', focalLength: '53mm' },
  }),
  makePhoto('cf_lagoon', 'Lagoon at Low Light', 'coastal', {
    location: 'Ballito, KwaZulu-Natal',
    date: '2021',
    tags: ['coast', 'monochrome', 'water'],
    aspectRatio: 'landscape',
    description: 'Still lagoon water holding the reflection of the houses on the bank above.',
    imagePath: 'assets/photos/coastal/lagoon-at-low-light.jpg',
    exif: { camera: D1000, lens: EF_28_80, shutterSpeed: '1/30', aperture: 'f/18', iso: 'ISO 400', focalLength: '28mm' },
  }),
  makePhoto('cf_dusk_1', 'Flat Sea at Dusk', 'coastal', {
    location: 'Ballito, KwaZulu-Natal',
    date: '2021',
    tags: ['coast', 'minimal'],
    aspectRatio: 'landscape',
    description: 'Nothing but water and a warm band of sky where the sun has already gone.',
    imagePath: 'assets/photos/coastal/flat-sea-at-dusk.jpg',
    exif: { camera: D1000, lens: EF_28_80, shutterSpeed: '1/200', aperture: 'f/10', iso: 'ISO 100', focalLength: '65mm' },
  }),
  makePhoto('cf_dusk_2', 'Last Colour', 'coastal', {
    location: 'Ballito, KwaZulu-Natal',
    date: '2021',
    tags: ['coast', 'minimal'],
    aspectRatio: 'landscape',
    description: 'Two seconds later — the swell rolling in under the last of the colour.',
    imagePath: 'assets/photos/coastal/last-colour.jpg',
    exif: { camera: D1000, lens: EF_28_80, shutterSpeed: '1/200', aperture: 'f/10', iso: 'ISO 100', focalLength: '65mm' },
  }),
  makePhoto('cf_ship', 'Ship on the Horizon', 'coastal', {
    location: 'Durban North, KwaZulu-Natal',
    date: '2026',
    tags: ['coast', 'minimal', 'shipping'],
    aspectRatio: 'landscape',
    description:
      'A single working ship sitting out on flat blue water under a washed-out sky, cropped right in so there is nothing else to look at.',
    observation: 'Anchored off the port waiting for a berth — there are usually a dozen of them out there.',
    imagePath: 'assets/photos/coastal/ship-on-the-horizon.jpg',
  }),

  // ---------------------------------------------------------------------
  // People — portraits made while out shooting.
  // ---------------------------------------------------------------------
  makePhoto('pe_tristan', 'Tristan in the Forest', 'people', {
    location: 'Virginia Bush Nature Reserve, Durban North',
    date: '2026',
    tags: ['portrait', 'forest'],
    aspectRatio: 'square',
    description:
      'Tristan under a big fig, bush hat on and camera harness across his chest, halfway through the walk.',
    observation: 'Hot enough by midday that the shirt had come off and gone round his waist.',
    imagePath: 'assets/photos/people/tristan-in-the-forest.jpg',
    exif: { camera: D2000, lens: EF_75_300, shutterSpeed: '1/320', aperture: 'f/8', iso: 'ISO 3200', focalLength: '75mm' },
  }),
];

// Photos curated for the homepage selected work section.
// Order matters — the grid gives cells 1, 4, 5 and 8 a double-width slot,
// so those four should be landscape frames.
export const SELECTED_WORK_IDS = [
  'wd_bay_bluff',    // 1 — wide
  'w_fish_eagle',    // 2
  'wd_fig_path',     // 3
  'w_lion_mist',     // 4 — wide
  'mc_canna',        // 5 — wide
  'ml_falls',        // 6
  'pe_tristan',      // 7
  'cf_break',        // 8 — wide
  'w_vulture_face',  // 9
  'mc_brackets',     // 10
];
