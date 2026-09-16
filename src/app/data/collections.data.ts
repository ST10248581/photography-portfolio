import { Collection } from '../models/photo.model';

export const COLLECTIONS: Collection[] = [
  {
    id: 'wildlife',
    title: 'Wildlife & Animals',
    slug: 'wildlife',
    description: 'Birds, reptiles, insects, and the small encounters that make time outdoors worthwhile.',
    coverImage: 'assets/photos/wildlife/african-elephant.jpg',
    coverPlaceholder: { bgColor: '#2a3a2e', label: 'Wildlife & Animals' },
    photoCount: 14,
  },
  {
    id: 'wild-durban',
    title: 'Wild Durban',
    slug: 'wild-durban',
    description: 'Documenting the wildlife and ecosystems around Durban and KwaZulu-Natal — from urban edges to coastal bush.',
    coverPlaceholder: { bgColor: '#2e3a3a', label: 'Wild Durban' },
    photoCount: 10,
  },
  {
    id: 'landscapes',
    title: 'Moody Landscapes',
    slug: 'landscapes',
    description: 'Fog, storms, empty coastlines, and the quieter side of the places I visit.',
    coverPlaceholder: { bgColor: '#1e2a30', label: 'Moody Landscapes' },
    photoCount: 8,
  },
  {
    id: 'macro',
    title: 'Macro / Tiny Worlds',
    slug: 'macro',
    description: 'The small things most people walk past — insects, spiders, frogs, and fine natural details.',
    coverPlaceholder: { bgColor: '#30292a', label: 'Macro / Tiny Worlds' },
    photoCount: 9,
  },
  {
    id: 'coastal',
    title: 'Coastal / Fishing',
    slug: 'coastal',
    description: 'The coast, the water, the people who fish it. Documentary photography around the shoreline.',
    coverPlaceholder: { bgColor: '#1e2830', label: 'Coastal / Fishing' },
    photoCount: 11,
  },
];
