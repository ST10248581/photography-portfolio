import { Collection, HeroConfig } from '../models/photo.model';

export const HERO: HeroConfig = {
  imagePath: 'assets/photos/landscapes/krantzkloof-river.jpg',
  kicker: 'Wildlife · Nature · Exploration',
  title: 'TROY',
  subtitle: 'Photography from KwaZulu-Natal',
};

export const COLLECTIONS: Collection[] = [
  {
    id: 'wildlife',
    title: 'Wildlife & Animals',
    slug: 'wildlife',
    description:
      'Lions, elephants and raptors from the KwaZulu-Natal Midlands — a day at the lion park and an afternoon at the raptor rescue.',
    coverImage: 'assets/photos/wildlife/lion-in-the-mist.jpg',
    coverPlaceholder: { bgColor: '#2a3a2e', label: 'Wildlife & Animals' },
    photoCount: 11,
  },
  {
    id: 'wild-durban',
    title: 'Wild Durban',
    slug: 'wild-durban',
    description:
      'Coastal forest on the Durban North ridge — trails, a stream crossing, and the view south across the bay to the Bluff. Virginia Bush Nature Reserve, on a spring morning.',
    coverImage: 'assets/photos/wild-durban/the-bay-and-the-bluff.jpg',
    coverPlaceholder: { bgColor: '#2e3a3a', label: 'Wild Durban' },
    photoCount: 7,
  },
  {
    id: 'landscapes',
    title: 'Moody Landscapes',
    slug: 'landscapes',
    description:
      'Forest trails, streams and falls in Krantzkloof Nature Reserve, shot through a winter morning.',
    coverImage: 'assets/photos/landscapes/water-over-the-ledges.jpg',
    coverPlaceholder: { bgColor: '#1e2a30', label: 'Moody Landscapes' },
    photoCount: 5,
  },
  {
    id: 'macro',
    title: 'Macro / Tiny Worlds',
    slug: 'macro',
    description:
      'The small things most people walk past — fungi coming up through wet leaf litter, and flowers along the forest edge.',
    coverImage: 'assets/photos/macro/canna-indica.jpg',
    coverPlaceholder: { bgColor: '#30292a', label: 'Macro / Tiny Worlds' },
    photoCount: 5,
  },
  {
    id: 'coastal',
    title: 'Coastal / Fishing',
    slug: 'coastal',
    description:
      'The rocks, swell and flat evening water at Ballito on the KwaZulu-Natal north coast, and the shipping lane off Durban.',
    coverImage: 'assets/photos/coastal/break-on-the-rock.jpg',
    coverPlaceholder: { bgColor: '#1e2830', label: 'Coastal / Fishing' },
    photoCount: 6,
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
];
