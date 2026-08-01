export interface Memory {
  id: string;
  date: string;
  title: string;
  message: string;
  image?: string; // place files in src/assets/images and import, or use a URL
}

/**
 * Replace these with your real memories. `image` is optional — leaving it
 * blank renders an elegant placeholder frame instead of a broken image.
 */
export const memories: Memory[] = [
  {
    id: 'mem-1',
    date: 'The day we met',
    title: 'Where it began',
    message: 'I still remember exactly how the light looked that day.',
  },
  {
    id: 'mem-2',
    date: 'Our first trip',
    title: 'Somewhere new, together',
    message: 'Every place feels like home when you\u2019re there.',
  },
  {
    id: 'mem-3',
    date: 'A quiet Tuesday',
    title: 'Nothing special, everything special',
    message: 'The ordinary days with you are my favorite kind of magic.',
  },
  {
    id: 'mem-4',
    date: 'Today',
    title: 'Still choosing you',
    message: 'In every lifetime, in every universe, I\u2019d still find you.',
  },
];
