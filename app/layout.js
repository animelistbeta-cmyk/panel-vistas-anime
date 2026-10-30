export const metadata = {
  title: 'Panel Vistas AniCrush',
  description: 'Estadísticas de reproducción para AniCrush',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#0e0e17' }}>
        {children}
      </body>
    </html>
  );
}