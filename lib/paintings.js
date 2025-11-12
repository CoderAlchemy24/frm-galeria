import raw from '../data.json';
import path from 'path';
import sizeOf from 'image-size';

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function toPublicPath(p) {
  // "./assets/..." -> "/assets/..."
  return typeof p === 'string' ? p.replace(/^\.\//, '/') : p;
}

function getImageDims(publicPath) {
  try {
    const fsPath = path.join(process.cwd(), 'public', publicPath.replace(/^\//, ''));
    const { width, height } = sizeOf(fsPath);
    return { width, height };
  } catch (e) {
    return { width: undefined, height: undefined };
  }
}

export const paintings = raw.map((p, i) => ({
  ...p,
  id: i + 1,
  slug: slugify(p.name),
  images: {
    thumbnail: toPublicPath(p.images.thumbnail),
    hero: {
      small: toPublicPath(p.images.hero.small),
      large: toPublicPath(p.images.hero.large)
    },
    gallery: (() => {
      const g = toPublicPath(p.images.gallery);
      const dims = getImageDims(g);
      return g;
    })(),
    // Provide intrinsic dimensions for gallery images when available
    galleryWidth: (() => {
      const g = toPublicPath(p.images.gallery);
      const { width } = getImageDims(g);
      return width;
    })(),
    galleryHeight: (() => {
      const g = toPublicPath(p.images.gallery);
      const { height } = getImageDims(g);
      return height;
    })()
  },
  artist: {
    ...p.artist,
    image: toPublicPath(p.artist.image)
  }
}));

export function getAllSlugs() {
  return paintings.map(p => p.slug);
}

export function getBySlug(slug) {
  return paintings.find(p => p.slug === slug);
}