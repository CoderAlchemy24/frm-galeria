"use client";

import Link from 'next/link';
import Image from 'next/image';
import { paintings } from '../lib/paintings';
import styles from './home.module.css';


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
            <div className='image-wrapper' >
              <img
                src={p.images.gallery}
                alt={p.name}
                width={targetW}
                height={targetH}
             
              />
              <div className='texts'>
                <h1 >{p.name}</h1>
                <p >{p.artist.name}</p>
              
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}