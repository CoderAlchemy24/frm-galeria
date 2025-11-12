import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAllSlugs, getBySlug } from '../../../lib/paintings';

import styles from './details.module.css';

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  // Minden objektumhoz létrehoz útvonalat build időben
  return getAllSlugs().map((slug: string) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const painting = getBySlug(slug);
  if (!painting) return { title: 'Not Found' };
  return {
    title: `${painting.name} – Galleria`,
    description: painting.description,
  };
}

export default async function PaintingPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const painting = getBySlug(slug);
  if (!painting) notFound();
  
  const slugs = getAllSlugs();
  const currentIndex = slugs.indexOf(slug);
  const prevSlug = currentIndex > 0 ? slugs[currentIndex - 1] : null;
  const nextSlug = currentIndex < slugs.length - 1 ? slugs[currentIndex + 1] : null;

 
  return (
    <article className={styles['details-page']}>
      <div className={styles['section-container']}>
       <section className={styles['column1']}>
        <div className={styles['painting-wrapper']} >
          <img
              src={painting.images.hero.large}
              alt={painting.name}
            
             
          />
        </div> 
        <div className={styles['inner']}>
          <div className={styles['name-and-author']}>
            <h2 className={styles["painting_name"]} >{painting.name}</h2>
            <h3 className={styles["artist-name"]}>{painting.artist.name}</h3>
          </div>
          <Image
            src={painting.artist.image}
            alt={painting.artist.name}
            width={128}
            height={128}
           
            priority={false}
            className={styles['artist']}
          />
         
        </div>
      </section>
      <section className={styles["column2"]} >
        <div className={styles['year']}>
          {painting.year}
        </div>
        <div className={styles['description-wrapper']}>
            <p >{painting.description}</p>
            <Link href={painting.source} 
              className={styles['source-link']}>
              GO TO SOURCE
            </Link>
        </div>
      </section>
      </div>
      <footer className={styles['footer']}>
        <div className={styles['footer-text']}>
           <h3>{painting.name}</h3>
           <h4>{painting.artist.name}</h4>
        </div>

        <nav className={styles["footer-nav"]}>
         
          {prevSlug && (
            <Link href={`/galleria/${prevSlug}`}>
              <svg width="91" height="24" viewBox="0 0 91 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles["back"]}>
                <path d="M3.62793 12.1121L24.166 22.3817V1.84261L3.62793 12.1121Z" stroke="black" strokeWidth="2"/>
                <rect x="-0.371478" y="0.371478" width="0.742956" height="23.0316" transform="matrix(-1 0 0 1 0.743372 0)" fill="#D8D8D8" stroke="black" strokeWidth="0.742956"/>
              </svg>  
            </Link>
          )}
          
          {nextSlug && (
            <Link href={`/galleria/${nextSlug}`}>
                <svg width="91" height="24" viewBox="0 0 91 24" fill="none" xmlns="http://www.w3.org/2000/svg"  className={styles["forward"]}>
                <path d="M3.62793 12.1121L24.166 22.3817V1.84261L3.62793 12.1121Z" stroke="black" strokeWidth="2"/>
                <rect x="-0.371478" y="0.371478" width="0.742956" height="23.0316" transform="matrix(-1 0 0 1 0.743372 0)" fill="#D8D8D8" stroke="black" strokeWidth="0.742956"/>
              </svg>
            </Link>
          )}
        </nav>
      </footer>
    
    </article>
  );
}