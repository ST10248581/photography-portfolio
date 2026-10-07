import { Collection, HeroConfig } from '../models/photo.model';

export const HERO: HeroConfig = {
  imagePath: 'assets/photos/coastal/break-on-the-rock.jpg',
  kicker: 'Wildlife · Nature · Exploration',
  title: ['TK', 'Photography'],
  subtitle: 'Photography from KwaZulu-Natal',
};

export const COLLECTIONS: Collection[] = [
  {
    id: 'wildlife',
    title: 'Wildlife & Animals',
    slug: 'wildlife',
    description:
      'Lions, elephants and raptors from the KwaZulu-Natal Midlands, and closer to home: herons, red bishops, Cape starlings and the vervet troop that runs the neighbourhood.',
    coverImage: 'assets/photos/wildlife/vervet-behind-bars.jpg',
    coverPosition: 'center 55%', // face sits low in the frame
    coverPlaceholder: { bgColor: '#2a3a2e', label: 'Wildlife & Animals' },
    photoCount: 20,
  },
  {
    id: 'wild-durban',
    title: 'Wild Durban',
    slug: 'wild-durban',
    description:
      'Coastal forest on the Durban North ridge — trails, a stream crossing, and the view south across the bay to the Bluff — and the city seen from the sand at Umhlanga.',
    coverImage: 'assets/photos/wild-durban/fig-over-the-path.jpg',
    coverPosition: 'center 80%', // tall frame — keep the backlit trail, not the canopy
    coverPlaceholder: { bgColor: '#2e3a3a', label: 'Wild Durban' },
    photoCount: 9,
  },
  {
    id: 'landscapes',
    title: 'Moody Landscapes',
    slug: 'landscapes',
    description:
      'Forest trails, streams and falls in Krantzkloof Nature Reserve on a winter morning, and the shadowed understorey of Virginia Bush.',
    coverImage: 'assets/photos/landscapes/forest-stream.jpg',
    coverPlaceholder: { bgColor: '#1e2a30', label: 'Moody Landscapes' },
    photoCount: 6,
  },
  {
    id: 'macro',
    title: 'Macro / Tiny Worlds',
    slug: 'macro',
    description:
      'The small things most people walk past — fungi coming up through wet leaf litter, a pill millipede on a mossy log, and flowers along the forest edge.',
    coverImage: 'assets/photos/macro/brackets-against-the-canopy.jpg',
    coverPlaceholder: { bgColor: '#30292a', label: 'Macro / Tiny Worlds' },
    photoCount: 7,
  },
  {
    id: 'coastal',
    title: 'Coastal / Fishing',
    slug: 'coastal',
    description:
      'The rocks, swell and flat evening water at Ballito, the lighthouse and reef at Umhlanga, and the shipping lane off Durban.',
    coverImage: 'assets/photos/coastal/umhlanga-lighthouse.jpg',
    coverPlaceholder: { bgColor: '#1e2830', label: 'Coastal / Fishing' },
    photoCount: 10,
  },
  {
    id: 'people',
    title: 'People',
    slug: 'people',
    description: 'Portraits made out on the trail — the people who come along for the walk.',
    coverImage: 'assets/photos/people/tristan-in-the-forest.jpg',
    coverPlaceholder: { bgColor: '#332c26', label: 'People' },
    photoCount: 1,
  },
  {
    id: 'skies',
    title: 'Skyward',
    slug: 'skies',
    description:
      'Looking up instead of out — sunsets burning through broken cloud, storm light over the garden, and the moon at full zoom.',
    coverImage: 'assets/photos/skies/fire-over-the-hills.jpg',
    coverPlaceholder: { bgColor: '#26283a', label: 'Skyward' },
    photoCount: 3,
  },
];
