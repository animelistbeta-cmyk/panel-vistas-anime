'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { ref, onValue } from 'firebase/database';

export default function Dashboard() {
  const [stats, setStats] = useState({ totalViews: 0, byAnime: {}, byServer: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const viewsRef = ref(db, 'vistas_reproductor');
    
    const unsubscribe = onValue(viewsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setLoading(false);
        return;
      }

      let total = 0;
      const animeCount = {};
      const serverCount = {};

      Object.values(data).forEach((item) => {
        total++;
        animeCount[item.animeId] = (animeCount[item.animeId] || 0) + 1;
        serverCount[item.server] = (serverCount[item.server] || 0) + 1;
      });

      setStats({
        totalViews: total,
        byAnime: animeCount,
        byServer: serverCount
      });
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div style={{ color: '#fff', padding: 40, textAlign: 'center' }}>Cargando Panel de Control...</div>;

  return (
    <div style={{ padding: 30, background: '#0e0e17', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif' }}>
      <h1 style={{ borderBottom: '2px solid #6c5ce7', paddingBottom: 10 }}>📊 Panel de Visualizaciones AniCrush</h1>

      <div style={{ background: '#181824', padding: 20, borderRadius: 12, width: 250, margin: '20px 0', border: '1px solid #333' }}>
        <h3 style={{ margin: 0, color: '#8c8d9e' }}>Total de Reproducciones</h3>
        <p style={{ fontSize: 36, fontWeight: 'bold', margin: '10px 0 0 0', color: '#00d9ff' }}>{stats.totalViews}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={{ background: '#181824', padding: 20, borderRadius: 12, border: '1px solid #333' }}>
          <h2>Vistas por Anime / Serie</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {Object.entries(stats.byAnime).map(([anime, count]) => (
              <li key={anime} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #222' }}>
                <span style={{ textTransform: 'capitalize' }}>{anime}</span>
                <strong style={{ color: '#ff4757' }}>{count} vistas</strong>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ background: '#181824', padding: 20, borderRadius: 12, border: '1px solid #333' }}>
          <h2>Servidores Más Utilizados</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {Object.entries(stats.byServer).map(([server, count]) => (
              <li key={server} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #222' }}>
                <span>{server}</span>
                <strong style={{ color: '#00b894' }}>{count} vistas</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}