import { Collection, HeroConfig } from '../models/photo.model';

export const HERO: HeroConfig = {
  imagePath: 'assets/photos/landscapes/PSX_20210706_175015.jpg',
  kicker: 'Wildlife · Nature · Exploration',
  title: 'TROY',
  subtitle: 'Photography from KwaZulu-Natal',
};

export const COLLECTIONS: Collection[] = [
  {
    id: 'wildlife',
    title: 'Wildlife & Animals',
    slug: 'wildlife',
    description: 'Lions, elephants and raptors from the KwaZulu-Natal Midlands — a day at the lion park and an afternoon at the raptor rescue.',
    coverImage: 'assets/photos/wildlife/IMG_4358.JPG',
    coverPlaceholder: { bgColor: '#2a3a2e', label: 'Wildlife & Animals' },
    photoCount: 11,
  },
  {
    id: 'wild-durban',
    title: 'Wild Durban',
    slug: 'wild-durban',
    description: 'Documenting the wildlife and ecosystems around Durban and KwaZulu-Natal — from urban edges to coastal bush.',
    coverPlaceholder: { bgColor: '#2e3a3a', label: 'Wild Durban' },
    photoCount: 0,
  },
  {
    id: 'landscapes',
    title: 'Moody Landscapes',
    slug: 'landscapes',
    description: 'Forest trails, streams and falls in Krantzkloof Nature Reserve, shot through a winter morning.',
    coverImage: 'assets/photos/landscapes/PSX_20210706_174753.jpg',
    coverPlaceholder: { bgColor: '#1e2a30', label: 'Moody Landscapes' },
    photoCount: 5,
  },
  {
    id: 'macro',
    title: 'Macro / Tiny Worlds',
    slug: 'macro',
    description: 'The small things most people walk past — insects, spiders, frogs, and fine natural details.',
    coverPlaceholder: { bgColor: '#30292a', label: 'Macro / Tiny Worlds' },
    photoCount: 0,
  },
  {
    id: 'coastal',
    title: 'Coastal / Fishing',
    slug: 'coastal',
    description: 'The rocks, swell and flat evening water at Ballito on the KwaZulu-Natal north coast.',
    coverImage: 'assets/photos/landscapes/IMG_4691.JPG',
    coverPlaceholder: { bgColor: '#1e2830', label: 'Coastal / Fishing' },
    photoCount: 5,
  },
];
