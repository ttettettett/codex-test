'use client'
import { useEffect, useState } from 'react'
import { auth, db } from '../../lib/firebase.client'
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth'
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore'

export default function DbPage() {
  const [user, setUser] = useState(null)
  const [text, setText] = useState('')
  const [items, setItems] = useState([])

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => setUser(u))
    signInAnonymously(auth).catch(console.error)
    return () => unsub()
  }, [])

  useEffect(() => {
    const q = query(collection(db, 'items'), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(q, snap => {
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    })
    return () => unsub()
  }, [])

  async function addItem(e) {
    e.preventDefault()
    if (!text.trim()) return
    await addDoc(collection(db, 'items'), {
      text, uid: user?.uid || null, createdAt: serverTimestamp()
    })
    setText('')
  }

  return (
    <main style={{ padding: 24, fontFamily: 'system-ui' }}>
      <h1>Firestore minimal CRUD</h1>
      <p>auth: {user ? `signed (uid:${user.uid.slice(0,6)}…)` : 'signing in…'}</p>

      <form onSubmit={addItem} style={{ marginTop: 16 }}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="add item…" style={{ padding: 8, width: 240 }}/>
        <button style={{ marginLeft: 8, padding: '8px 12px' }}>Add</button>
      </form>

      <ul style={{ marginTop: 24 }}>
        {items.map(it => <li key={it.id}>• {it.text || '(no text)'} </li>)}
      </ul>
    </main>
  )
}
