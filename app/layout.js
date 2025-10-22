export const metadata = { title: 'App Hosting smoke' };

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
