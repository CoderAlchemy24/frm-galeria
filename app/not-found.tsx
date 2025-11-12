import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: 8 }}>404 – Not found</h1>
     
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link href="/">Back</Link>
      </div>
    </div>
  );
}
