"use client";

import Link from 'next/link';
import Image from 'next/image';
import { paintings } from '../lib/paintings';


type PaintingCard = {
  slug: string;
  name: string;
  year: number;
  artist: { name: string };
   images: {
    gallery: string;
    galleryWidth?: number; 
    galleryHeight?: number; 
  };

};

export default function HomePage() {


  
  return (
    <div className="grid-masonry">
      {(paintings as PaintingCard[]).map((p) => {
        const gw = p.images.galleryWidth ?? undefined;
        const gh = p.images.galleryHeight ?? undefined;
        const targetW = 310;
        const targetH = gw && gh ? Math.round((targetW * gh) / gw) : 310;
        return (
          <Link key={p.slug} href={`/galleria/${p.slug}`} className="grid-item">
            <div style={{  width: '100%' }}>
              <Image
                src={p.images.gallery}
                alt={p.name}
                width={targetW}
                height={targetH}
                style={{ objectFit: 'cover', display: 'block', width: '100%', height: 'auto'}}
                priority={false}
              />
              <div className='text-container'>
                <h3 style={{ margin: 0, color: '#FFFFFF' }}>{p.name}</h3>
                <p style={{ margin: '0.25rem 0 0', color: '#FFF' }}>{p.artist.name}</p>
              
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}