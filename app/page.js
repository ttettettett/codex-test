import Link from 'next/link'

export default function Page() {
  return (
    <main>
      <h1>Hello from CodeX → Firebase App Hosting 🚀</h1>
      <p>Env: {process.env.NEXT_PUBLIC_SITE_NAME}</p>
      <p>Flow: Commit → PR → Merge → App Hosting build & deploy</p>
      <p style={{ marginTop: 24 }}>
        <Link
          href="/db"
          style={{
            display: 'inline-block',
            padding: '10px 16px',
            borderRadius: 6,
            background: '#2563eb',
            color: 'white',
            textDecoration: 'none',
            fontWeight: 600
          }}
        >
          View Firestore demo
        </Link>
      </p>
    </main>
  );
}
