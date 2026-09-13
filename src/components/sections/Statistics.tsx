'use client'

import { motion } from 'framer-motion'
import statistics from '@/data/statistics.json'

const skills = [
  'Python',
  'React',
  'JavaScript',
  'TypeScript',
  'Next.js',
  'HTML',
  'CSS',
  'SQL',
  'Lua',
  'C',
  'C++',
  'C#',
  'PHP',
  'Java',
  'Kotlin',
]

const chartWidth = 900
const chartHeight = 360
const padding = { top: 32, right: 28, bottom: 58, left: 54 }
const innerWidth = chartWidth - padding.left - padding.right
const innerHeight = chartHeight - padding.top - padding.bottom
const maxValue = Math.max(...statistics.affectedUsers.map((item) => item.count), 1)

const points = statistics.affectedUsers.map((item, index) => {
  const x = padding.left + (index / Math.max(statistics.affectedUsers.length - 1, 1)) * innerWidth
  const y = padding.top + innerHeight - (item.count / maxValue) * innerHeight
  return { ...item, x, y }
})

const linePath = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')

export default function Statistics() {
  const totalAffected = statistics.affectedUsers[statistics.affectedUsers.length - 1]?.count ?? 0

  return (
    <section id="statistics" style={{ position: 'relative', padding: '100px 24px 140px' }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}
          >
            Ykiel / Statistics
          </span>

          <h2
            style={{
              margin: '12px 0 0',
              fontSize: 'clamp(32px, 6vw, 58px)',
              lineHeight: 1,
              letterSpacing: '-0.04em',
              fontWeight: 800,
            }}
          >
            Affected Users
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ marginTop: 70 }}
        >
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Tech Stack
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
            {skills.map((skill) => (
              <span
                key={skill}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: 999,
                  padding: '6px 12px',
                  background: 'var(--bg-card)',
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            marginTop: 34,
            border: '1px solid var(--border)',
            borderRadius: 24,
            background: 'rgba(26,26,26,0.62)',
            backdropFilter: 'blur(12px)',
            padding: '26px 22px 20px',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, marginBottom: 18 }}>
            <div>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                CURRENT
              </span>
              <div style={{ fontSize: 'clamp(34px, 7vw, 54px)', lineHeight: 1, fontWeight: 800, marginTop: 5 }}>
                {totalAffected.toLocaleString()}
              </div>
            </div>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'var(--text-muted)' }}>
              August — December
            </span>
          </div>

          <div style={{ width: '100%', overflowX: 'auto' }}>
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} width="100%" role="img" aria-label="Affected users line chart from August to December">
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                const y = padding.top + innerHeight - ratio * innerHeight
                return (
                  <line
                    key={ratio}
                    x1={padding.left}
                    x2={chartWidth - padding.right}
                    y1={y}
                    y2={y}
                    stroke="rgba(255,255,255,0.07)"
                    strokeWidth="1"
                  />
                )
              })}

              <path d={linePath} fill="none" stroke="var(--text-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

              {points.map((point) => (
                <g key={point.month}>
                  <circle cx={point.x} cy={point.y} r="5" fill="var(--bg-primary)" stroke="var(--text-primary)" strokeWidth="2" />
                  <text x={point.x} y={chartHeight - 20} textAnchor="middle" fill="var(--text-muted)" fontSize="12" fontFamily="DM Mono, monospace">
                    {point.month}
                  </text>
                  <text x={point.x} y={point.y - 14} textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="DM Mono, monospace">
                    {point.count.toLocaleString()}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ marginTop: 90 }}
        >
          <div
            style={{
              width: '100%',
              aspectRatio: '16 / 7',
              minHeight: 220,
              borderRadius: 24,
              overflow: 'hidden',
              border: '1px solid var(--border)',
              background: 'var(--bg-card)',
            }}
          >
            <img src="/assets/bandd.png" alt="Ykiel visual" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.25 }}
          style={{ marginTop: 70 }}
        >
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Local JSON Data
          </span>
          <pre
            style={{
              marginTop: 16,
              padding: 22,
              borderRadius: 20,
              border: '1px solid var(--border)',
              background: 'rgba(13,13,13,0.82)',
              color: 'var(--text-secondary)',
              fontFamily: "'DM Mono', monospace",
              fontSize: 12,
              lineHeight: 1.8,
              overflowX: 'auto',
            }}
          >
            {JSON.stringify(statistics, null, 2)}
          </pre>
        </motion.div>
      </div>
    </section>
  )
}
