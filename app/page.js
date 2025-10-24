"use client";

import { useMemo, useState } from 'react';
import Link from 'next/link'

const operations = [
  { value: 'add', label: '足し算 (+)' },
  { value: 'subtract', label: '引き算 (-)' },
  { value: 'multiply', label: '掛け算 (×)' },
  { value: 'divide', label: '割り算 (÷)' }
];

export default function Page() {
  const [left, setLeft] = useState('12');
  const [right, setRight] = useState('3');
  const [operation, setOperation] = useState(operations[0].value);

  const result = useMemo(() => {
    const a = Number(left);
    const b = Number(right);

    if (Number.isNaN(a) || Number.isNaN(b)) {
      return '数字を入力してください';
    }

    switch (operation) {
      case 'add':
        return `${a + b}`;
      case 'subtract':
        return `${a - b}`;
      case 'multiply':
        return `${a * b}`;
      case 'divide':
        return b === 0 ? '0 で割ることはできません' : `${a / b}`;
      default:
        return '';
    }
  }, [left, right, operation]);

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', lineHeight: 1.6 }}>
      <h1>Hello from CodeX → Firebase App Hosting 🚀</h1>
      <p>Env: {process.env.NEXT_PUBLIC_SITE_NAME}</p>
      <p>Flow: Commit → PR → Merge → App Hosting build & deploy</p>

      <section
        style={{
          marginTop: 32,
          padding: 24,
          border: '1px solid #e2e8f0',
          borderRadius: 12,
          maxWidth: 480,
          background: '#f8fafc'
        }}
      >
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
          サンプル計算アプリ
        </h2>
        <p style={{ marginBottom: 16 }}>
          好きな数字を入力して計算方法を選んでみてください。
        </p>

        <div style={{ display: 'grid', gap: 12 }}>
          <label style={{ display: 'grid', gap: 4 }}>
            <span>左の数字</span>
            <input
              type="number"
              value={left}
              onChange={(event) => setLeft(event.target.value)}
              style={{
                padding: '10px 12px',
                borderRadius: 8,
                border: '1px solid #cbd5f5'
              }}
            />
          </label>

          <label style={{ display: 'grid', gap: 4 }}>
            <span>右の数字</span>
            <input
              type="number"
              value={right}
              onChange={(event) => setRight(event.target.value)}
              style={{
                padding: '10px 12px',
                borderRadius: 8,
                border: '1px solid #cbd5f5'
              }}
            />
          </label>

          <label style={{ display: 'grid', gap: 4 }}>
            <span>計算方法</span>
            <select
              value={operation}
              onChange={(event) => setOperation(event.target.value)}
              style={{
                padding: '10px 12px',
                borderRadius: 8,
                border: '1px solid #cbd5f5'
              }}
            >
              {operations.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <div
            style={{
              marginTop: 8,
              padding: '16px 12px',
              borderRadius: 8,
              background: 'white',
              border: '1px solid #cbd5f5'
            }}
          >
            <span style={{ fontWeight: 700 }}>計算結果：</span>
            <span style={{ marginLeft: 8 }}>{result}</span>
          </div>
        </div>
      </section>

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
