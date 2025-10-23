'use client'
import { useEffect, useState } from 'react'
import { auth, db } from '../../lib/firebase.client'
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth'
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore'

export default function DbPage() {
  const [user, setUser] = useState(null)
  const [text, setText] = useState('')
  const [items, setItems] = useState([])
  const [dbStatus, setDbStatus] = useState('checking')
  const [dbError, setDbError] = useState(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => setUser(u))
    signInAnonymously(auth).catch(console.error)
    return () => unsub()
  }, [])

  useEffect(() => {
    const q = query(collection(db, 'items'), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(
      q,
      snap => {
        setDbStatus('connected')
        setDbError(null)
        setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      },
      err => {
        console.error(err)
        setDbStatus('error')
        setDbError(err.message)
      }
    )
    return () => unsub()
  }, [])

  async function addItem(e) {
    e.preventDefault()
    if (!text.trim()) return
    try {
      await addDoc(collection(db, 'items'), {
        text,
        uid: user?.uid || null,
        createdAt: serverTimestamp()
      })
      setDbStatus('connected')
      setDbError(null)
      setText('')
    } catch (err) {
      console.error(err)
      setDbStatus('error')
      setDbError(err.message)
    }
  }

  function formatTimestamp(ts) {
    if (!ts?.toDate) return '—'
    try {
      return ts.toDate().toLocaleString()
    } catch (err) {
      console.error('Failed to format timestamp', err)
      return '—'
    }
  }

  return (
    <main style={{ padding: 24, fontFamily: 'system-ui' }}>
      <h1>Firestore minimal CRUD</h1>
      <p>auth: {user ? `signed (uid:${user.uid.slice(0,6)}…)` : 'signing in…'}</p>
      <p>
        database:{' '}
        {dbStatus === 'connected' && 'connected ✅'}
        {dbStatus === 'checking' && 'checking…'}
        {dbStatus === 'error' && 'error ❌'}
        {dbError && (
          <span style={{ color: '#dc2626', marginLeft: 8 }}>
            ({dbError})
          </span>
        )}
      </p>

      <form onSubmit={addItem} style={{ marginTop: 16 }}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="add item…" style={{ padding: 8, width: 240 }}/>
        <button style={{ marginLeft: 8, padding: '8px 12px' }}>Add</button>
      </form>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ marginBottom: 12 }}>items collection</h2>
        {items.length === 0 ? (
          <p style={{ color: '#4b5563' }}>No documents yet — add your first item above.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                borderCollapse: 'collapse',
                minWidth: 480,
                width: '100%',
                fontSize: 14
              }}
            >
              <thead>
                <tr style={{ background: '#f3f4f6' }}>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '1px solid #d1d5db' }}>Text</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '1px solid #d1d5db' }}>UID</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '1px solid #d1d5db' }}>Created</th>
                </tr>
              </thead>
              <tbody>
                {items.map(it => (
                  <tr key={it.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '8px 12px' }}>{it.text || '(no text)'}</td>
                    <td style={{ padding: '8px 12px', color: '#4b5563' }}>{it.uid ? `${it.uid.slice(0, 8)}…` : '—'}</td>
                    <td style={{ padding: '8px 12px', color: '#4b5563' }}>{formatTimestamp(it.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}
