import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { createPortal } from 'react-dom'
import { ArrowDown, ArrowLeft, ArrowRight, AudioLines, Heart, Pause, Play, X } from 'lucide-react'
import { birthdayData } from './data/birthdayData'
import './birthday.css'
import './celestial.css'

function Reveal({ children, className = '', delay = 0 }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div className={className} initial={reduceMotion ? false : { opacity: 0, y: 24, filter: 'blur(6px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: reduceMotion ? 0 : 0.7, delay }}>
      {children}
    </motion.div>
  )
}

function Heading({ eyebrow, title, note }) {
  return <Reveal className="section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{note && <p className="section-note">{note}</p>}</Reveal>
}

function Stars() {
  return <div className="stars" aria-hidden="true">{Array.from({ length: 34 }, (_, i) => <i key={i} style={{ '--x': `${(i * 41 + 9) % 100}%`, '--y': `${(i * 63 + 6) % 100}%`, '--delay': `${(i % 7) * -1.2}s` }} />)}</div>
}

function MoonMark({ className = '' }) {
  return <svg className={`moon-mark ${className}`} viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 14.1A8.8 8.8 0 0 1 9.9 3.2a9.1 9.1 0 1 0 10.9 10.9Z" /></svg>
}

function HeartOrbit() {
  return (
    <svg className="heart-orbit" viewBox="0 0 400 400" aria-hidden="true">
      <path d="M200 356C166 326 40 248 30 167 22 102 65 53 123 51c34-1 61 17 77 48 16-31 43-49 77-48 58 2 101 51 93 116-10 81-136 159-170 189Z" />
      <path d="M200 326C168 299 61 233 52 166c-7-51 28-89 74-89 31 0 57 17 74 48 17-31 43-48 74-48 46 0 81 38 74 89-9 67-116 133-148 160Z" />
      <path d="M200 296C170 271 83 219 75 164c-6-39 21-67 56-67 29 0 52 17 69 47 17-30 40-47 69-47 35 0 62 28 56 67-8 55-95 107-125 132Z" />
    </svg>
  )
}

function HeartTextPath() {
  return (
    <svg className="heart-text-svg" viewBox="0 0 800 800" aria-hidden="true" focusable="false">
      <defs>
          <path id="why-heart-text-path" d="M40 170C150 96 255 72 360 100 380 105 390 110 400 110 410 110 420 105 440 100 545 72 650 96 760 170" />
      </defs>
      <text><textPath href="#why-heart-text-path" startOffset="50%" textAnchor="middle" textLength="760" lengthAdjust="spacing">Why you're wonderful.</textPath></text>
    </svg>
  )
}

function HeartCursor() {
  const cursorRef = useRef(null)
  const trailRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined
    const cursor = cursorRef.current
    const trail = trailRef.current
    if (!cursor || !trail) return undefined

    let targetX = -100
    let targetY = -100
    let currentX = targetX
    let currentY = targetY
    let trailX = targetX
    let trailY = targetY
    let currentTilt = 0
    let isVisible = false
    let isInitialized = false
    let frameId
    let lastTime = 0

    const move = (event) => {
      targetX = event.clientX
      targetY = event.clientY

      if (!isInitialized) {
        currentX = targetX
        currentY = targetY
        trailX = targetX
        trailY = targetY
        isInitialized = true
      }

      if (!isVisible) {
        isVisible = true
        cursor.classList.add('is-visible')
        trail.classList.add('is-visible')
      }

      const interactive = Boolean(event.target.closest?.('a, button, input, textarea, select, [role="button"], .envelope, .memory button, .gift-button'))
      cursor.classList.toggle('is-hovering', interactive)
      trail.classList.toggle('is-hovering', interactive)
    }

    const leave = () => {
      isVisible = false
      cursor.classList.remove('is-visible')
      trail.classList.remove('is-visible')
    }

    const enter = (event) => {
      targetX = event.clientX
      targetY = event.clientY
      currentX = targetX
      currentY = targetY
      trailX = targetX
      trailY = targetY
      isVisible = true
      cursor.classList.add('is-visible')
      trail.classList.add('is-visible')
    }

    const down = () => {
      cursor.classList.add('is-clicking')
      trail.classList.add('is-clicking')
    }

    const up = () => {
      cursor.classList.remove('is-clicking')
      trail.classList.remove('is-clicking')
    }

    const animate = (currentTime) => {
      if (!lastTime) lastTime = currentTime
      const dt = Math.min((currentTime - lastTime) / 1000, 0.05)
      lastTime = currentTime

      if (isInitialized) {
        // Delta-time based smooth exponential decay (refresh-rate independent)
        const cursorFactor = 1 - Math.exp(-28 * dt)
        currentX += (targetX - currentX) * cursorFactor
        currentY += (targetY - currentY) * cursorFactor

        // Soft fluid trailing follower
        const trailFactor = 1 - Math.exp(-12 * dt)
        trailX += (targetX - trailX) * trailFactor
        trailY += (targetY - trailY) * trailFactor

        // Dynamic tilt based on horizontal velocity
        const vx = targetX - currentX
        const targetTilt = Math.max(-14, Math.min(14, vx * 0.12))
        currentTilt += (targetTilt - currentTilt) * (1 - Math.exp(-14 * dt))

        if (Math.abs(targetX - currentX) < 0.04) currentX = targetX
        if (Math.abs(targetY - currentY) < 0.04) currentY = targetY
        if (Math.abs(targetX - trailX) < 0.04) trailX = targetX
        if (Math.abs(targetY - trailY) < 0.04) trailY = targetY

        cursor.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0) translate(-50%, -50%) rotate(${currentTilt.toFixed(2)}deg)`
        trail.style.transform = `translate3d(${trailX.toFixed(2)}px, ${trailY.toFixed(2)}px, 0) translate(-50%, -50%)`
      }

      frameId = window.requestAnimationFrame(animate)
    }

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerdown', down, { passive: true })
    window.addEventListener('pointerup', up, { passive: true })
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)

    frameId = window.requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
      window.cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <>
      <div className="heart-cursor-trail" ref={trailRef} aria-hidden="true" />
      <div className="heart-cursor" ref={cursorRef} aria-hidden="true">
        <div className="heart-cursor-inner">
          <svg viewBox="0 0 24 24">
            <defs>
              <linearGradient id="cursor-heart-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#ff8eaf" />
                <stop offset="1" stopColor="#d72655" />
              </linearGradient>
            </defs>
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
          </svg>
        </div>
      </div>
    </>
  )
}

function CurtainReveal() {
  const [phase, setPhase] = useState('closed') // closed → pause → open → done
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) { setPhase('done'); return }
    // Wait for loading screen to finish (1050ms) + small settle
    const pauseTimer = window.setTimeout(() => setPhase('pause'), 1200)
    const openTimer  = window.setTimeout(() => setPhase('open'),  1900)
    const doneTimer  = window.setTimeout(() => setPhase('done'),  3400)
    return () => {
      window.clearTimeout(pauseTimer)
      window.clearTimeout(openTimer)
      window.clearTimeout(doneTimer)
    }
  }, [reduceMotion])

  if (phase === 'done') return null

  const transition = {
    duration: 1.32,
    ease: [0.76, 0, 0.24, 1],
  }

  const leftVariants = {
    closed:  { x: '0%' },
    pause:   { x: '0%' },
    open:    { x: '-100%' },
  }
  const rightVariants = {
    closed:  { x: '0%' },
    pause:   { x: '0%' },
    open:    { x: '100%' },
  }

  return createPortal(
    <div className="curtain-reveal" aria-hidden="true">
      <motion.div
        className="curtain curtain-left"
        variants={leftVariants}
        animate={phase}
        initial="closed"
        transition={transition}
      >
        <div className="curtain-folds curtain-folds-left" />
        <div className="curtain-sheen curtain-sheen-left" />
        <div className="curtain-edge curtain-edge-left" />
      </motion.div>
      <motion.div
        className="curtain curtain-right"
        variants={rightVariants}
        animate={phase}
        initial="closed"
        transition={transition}
      >
        <div className="curtain-folds curtain-folds-right" />
        <div className="curtain-sheen curtain-sheen-right" />
        <div className="curtain-edge curtain-edge-right" />
      </motion.div>
    </div>,
    document.body
  )
}

function LoadingExperience() {
  return <motion.div className="loading-screen" initial={{ opacity: 1 }} exit={{ opacity: 0, filter: 'blur(8px)' }} transition={{ duration: 0.65 }}><Stars /><MoonMark /><div className="loading-heart"><Heart size={24} fill="currentColor" /></div><p>Something special is waiting for you...</p></motion.div>
}

function FloatingHearts() {
  return <div className="floating-hearts" aria-hidden="true">{Array.from({ length: 3 }, (_, i) => <Heart key={i} size={i === 1 ? 8 : 10} fill="currentColor" style={{ '--heart-delay': `${i * -8}s`, '--heart-left': `${18 + i * 31}%` }} />)}</div>
}

function Hero() {
  const { recipientName, hero } = birthdayData
  return (
    <section className="hero" style={{ '--hero-image': `url("${hero.image}")` }} id="top">
      <div className="hero-grain" aria-hidden="true" />
      <MoonMark className="hero-moon" />
      <header className="site-mark"><a href="#top">for you</a><i /><span>A birthday keepsake</span></header>
      <div className="hero-copy">
        <motion.p className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2, duration: .8 }}>{hero.kicker}</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .4, duration: .9 }}>Happy birthday,<em>{recipientName}.</em></motion.h1>
        <motion.p className="hero-message" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .8, duration: 1 }}>{hero.message}</motion.p>
        <motion.a className="begin-link" href="#letter" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}><span>Come a little closer</span><ArrowDown size={16} /></motion.a>
      </div>
      <div className="hero-caption"><i /> A day made brighter by you</div>
      <div className="hero-frame" aria-hidden="true" />
    </section>
  )
}

function Letter() {
  const [page, setPage] = useState(0)
  const pages = birthdayData.letter.pages
  return (
    <section className="section letter-section" id="letter">
      <Stars />
      <MoonMark className="letter-moon" />
      <Heading eyebrow="Personal letter" title="My heart to yours." note="Every word, a little piece of me." />
      <Reveal className="letter-wrap"><div className="letter-paper">
        <Heart className="letter-watermark" aria-hidden="true" />
        <div className="paper-label"><span>PERSONAL LETTER</span><span>PAGE {page + 1} OF {pages.length}</span></div>
        <div className="letter-flourish" aria-hidden="true"><Heart size={12} fill="currentColor" /><span>✦</span><Heart size={12} fill="currentColor" /></div>
        <AnimatePresence mode="wait" initial={false}><motion.article key={page} className="letter-copy" initial={{ opacity: 0, x: 18, filter: 'blur(3px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, x: -14, filter: 'blur(3px)' }} transition={{ duration: .48 }} aria-live="polite">
          <p className="letter-salutation"><LetterText text={pages[page].title} /></p><p><LetterText text={pages[page].content} /></p>
          {page === pages.length - 1 && <p className="letter-signoff">With all my love,<br /><em>{birthdayData.senderName}</em></p>}
        </motion.article></AnimatePresence>
        <div className="letter-controls"><button type="button" onClick={() => setPage((n) => Math.max(n - 1, 0))} disabled={!page}><ArrowLeft size={16} /> Previous</button><span>{String(page + 1).padStart(2, '0')} <i /> {String(pages.length).padStart(2, '0')}</span><button type="button" onClick={() => setPage((n) => Math.min(n + 1, pages.length - 1))} disabled={page === pages.length - 1}>Next <ArrowRight size={16} /></button></div>
      </div><span className="letter-seal" aria-hidden="true"><Heart size={19} fill="currentColor" /></span></Reveal>
    </section>
  )
}

function LetterText({ text }) {
  return text.replaceAll('[NAME]', birthdayData.recipientName).split(/(❤️|♥)/u).map((part, index) => part === '❤️' || part === '♥'
    ? <Heart className="letter-inline-heart" key={index} aria-label="love" fill="currentColor" />
    : part)
}

function Reasons() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const reasons = birthdayData.reasons
  useEffect(() => {
    if (paused) return undefined
    const timer = window.setInterval(() => setActive((n) => (n + 1) % reasons.length), 5200)
    return () => window.clearInterval(timer)
  }, [paused, reasons.length])
  const move = (delta) => { setPaused(true); setActive((n) => (n + delta + reasons.length) % reasons.length) }
  return (
    <section className="section reasons-section" id="reasons"><Stars /><MoonMark className="section-moon" />
      <div className="reasons-content">
        <Reveal className="section-heading reason-heading">
          <p className="eyebrow">Little things, big reasons</p>
          <h2 className="sr-only">Why you're wonderful.</h2>
          <div className="heart-orbit-stage" aria-hidden="true"><HeartOrbit /><HeartTextPath /></div>
          <p className="section-note">And that's only the beginning.</p>
        </Reveal>
        <Reveal className="reason-stage">
          <AnimatePresence mode="wait"><motion.div className="reason-copy" key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .35 }} aria-live="polite"><span className="reason-heart"><Heart size={22} /></span><h3>{reasons[active].title}</h3><p>{reasons[active].description}</p></motion.div></AnimatePresence>
          <span className="reason-count">{String(active + 1).padStart(2, '0')} <i /> {String(reasons.length).padStart(2, '0')}</span>
          <div className="reason-footer"><div className="reason-progress">{reasons.map((reason, i) => <span key={reason.title} className={i === active ? 'active' : ''} />)}</div><div className="reason-buttons"><button type="button" aria-label="Previous reason" onClick={() => move(-1)}><ArrowLeft size={17} /></button><button type="button" aria-label="Next reason" onClick={() => move(1)}><ArrowRight size={17} /></button><button type="button" aria-label={paused ? 'Resume automatic rotation' : 'Pause automatic rotation'} onClick={() => setPaused((v) => !v)}>{paused ? <Play size={14} /> : <Pause size={14} />}</button></div></div>
        </Reveal>
      </div>
    </section>
  )
}

function MemoryCard({ memory, index, active, onSelect }) {
  const number = String(index + 1).padStart(2, '0')
  return (
    <Reveal delay={(index % 3) * .06} className={`memory memory-${index + 1}`}>
      <button type="button" className={active ? 'selected' : ''} onClick={onSelect} aria-pressed={active} aria-label={`${memory.title || `Memory ${number}`}: ${memory.note || 'empty photo placeholder'}`}>
        {memory.image
          ? <img src={memory.image} alt={memory.alt || ''} loading="lazy" />
          : <span className="memory-placeholder" role="img" aria-label={memory.alt || `Empty image placeholder ${number}`} />}
        <span className="memory-shade" />
        <span className="memory-no">{number}</span>
        {(memory.title || memory.note) && <span className="memory-caption">{memory.title && <b>{memory.title}</b>}{memory.note && <i>{memory.note}</i>}</span>}
      </button>
    </Reveal>
  )
}

function Memories() {
  const [active, setActive] = useState(null)
  return (
    <section className="section memories-section" id="memories"><Heading eyebrow="Little moments, kept close" title="A life in lovely moments." note="Some days stay with you long after they pass." />
      <div className="memory-grid">{birthdayData.memories.map((memory, index) => <MemoryCard key={memory.id || memory.title || index} memory={memory} index={index} active={active === index} onSelect={() => setActive((current) => current === index ? null : index)} />)}</div>
      <p className="gallery-note"><i /> Made of the moments that matter <i /></p>
    </section>
  )
}

function VoiceNote() {
  const audio = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const hasAudio = Boolean(birthdayData.voiceNote.audio)
  const toggle = async () => {
    if (!audio.current || !hasAudio) return
    if (playing) { audio.current.pause(); setPlaying(false); return }
    try { await audio.current.play(); setPlaying(true) } catch { setPlaying(false) }
  }
  const formatTime = (value) => Number.isFinite(value) ? `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(2, '0')}` : '0:00'
  return (
    <section className="section voice-section" id="voice"><Heading eyebrow="A voice to keep nearby" title="A little something from me." note="Some things are best said out loud." />
      <Reveal className="voice-player"><div className="record-column"><div className={`record ${playing ? 'record-playing' : ''}`}><img src={birthdayData.voiceNote.artwork} alt="" loading="lazy" /></div><small>A LITTLE NOTE <i>♥</i></small></div>
        <div className="voice-details"><p className="eyebrow">A voice note for</p><h3>{birthdayData.recipientName}</h3><p>{birthdayData.voiceNote.description}</p><div className="audio-progress"><i style={{ width: `${duration ? time / duration * 100 : 0}%` }} /></div><div className="audio-time"><span>{formatTime(time)}</span><span>{duration ? formatTime(duration) : hasAudio ? '0:00' : 'A note to come'}</span></div>
          <div className="voice-controls"><button type="button" onClick={toggle} disabled={!hasAudio} aria-label={playing ? 'Pause voice note' : 'Play voice note'}>{playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}</button><span><b>A message from {birthdayData.senderName}</b><small>{hasAudio ? (playing ? 'NOW PLAYING' : 'TAP WHEN YOU\'RE READY') : 'YOUR RECORDING WILL LIVE HERE'}</small></span><AudioLines className={playing ? 'equalizer active' : 'equalizer'} size={24} /></div>
          {hasAudio ? <audio ref={audio} src={birthdayData.voiceNote.audio} preload="metadata" onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)} onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)} onEnded={() => setPlaying(false)} onError={() => setPlaying(false)} /> : <small className="audio-fallback">Add a recording at <code>/public/audio/voice-placeholder.mp3</code> to enable playback.</small>}
        </div>
      </Reveal>
    </section>
  )
}

function MessageModal({ item, close }) {
  const closeButton = useRef(null)
  useEffect(() => {
    const previousFocus = document.activeElement
    closeButton.current?.focus()
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKeydown = (event) => {
      if (event.key === 'Escape') close()
      if (event.key === 'Tab') {
        event.preventDefault()
        closeButton.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeydown)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', handleKeydown)
      previousFocus?.focus?.()
    }
  }, [close])
  return <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => { if (e.target === e.currentTarget) close() }}><motion.section className="message-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 12, opacity: 0 }}><button className="modal-close" ref={closeButton} onClick={close} aria-label="Close message"><X size={19} /></button><span className="modal-heart"><Heart size={20} fill="currentColor" /></span><p className="eyebrow">A note, just for this moment</p><h2 id="modal-title">{item.title}</h2><div className="modal-message">{item.message.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}</div><span className="modal-signoff">With love, {birthdayData.senderName} ❤️</span></motion.section></motion.div>
}

function Letters() {
  const [message, setMessage] = useState(null)
  return <section className="section open-section" id="letters"><Heading eyebrow="For the days in between" title="Whenever you need a little love." note="Pick one. It's meant for this exact moment." /><div className="envelope-grid">{birthdayData.openWhen.map((item, i) => <Reveal key={item.title} delay={(i % 3) * .06}><button className="envelope" onClick={() => setMessage(item)}><span className="envelope-number">0{i + 1}</span><span className="envelope-art"><i /><b /></span><span className="envelope-title">{item.title}</span><span className="envelope-open">Open this note <ArrowRight size={14} /></span></button></Reveal>)}</div><AnimatePresence>{message && <MessageModal item={message} close={() => setMessage(null)} />}</AnimatePresence></section>
}

function GiftBurst({ origin, reducedMotion }) {
  const particles = Array.from({ length: reducedMotion ? 18 : 76 }, (_, particleIndex) => {
    const angle = particleIndex * 137.5 * (Math.PI / 180)
    const distance = Math.hypot(window.innerWidth, window.innerHeight) * (.2 + ((particleIndex * 37) % 80) / 100)
    const colors = ['#ff94b3', '#ffd1dc', '#fff7f2', '#f04475', '#d5b781']
    const style = {
      '--origin-x': `${origin.x}px`,
      '--origin-y': `${origin.y}px`,
      '--travel-x': `${Math.cos(angle) * distance}px`,
      '--travel-y': `${Math.sin(angle) * distance}px`,
      '--spin': `${(particleIndex % 2 ? 1 : -1) * (150 + particleIndex * 13)}deg`,
      '--delay': `${(particleIndex % 8) * 18}ms`,
      '--particle-color': colors[particleIndex % colors.length],
      '--particle-size': `${12 + (particleIndex % 5) * 2}px`,
      '--particle-width': `${4 + (particleIndex % 3) * 2}px`,
      '--particle-height': `${8 + (particleIndex % 4) * 3}px`,
    }
    return particleIndex % 6 === 0
      ? <Heart className="burst-heart" key={particleIndex} style={style} fill="currentColor" aria-hidden="true" />
      : <i className="burst-cracker" key={particleIndex} style={style} aria-hidden="true" />
  })

  return <motion.div className="gift-fireworks" aria-hidden="true" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .25 }}><i className="gift-pop" style={{ '--origin-x': `${origin.x}px`, '--origin-y': `${origin.y}px` }} />{particles}</motion.div>
}

function SurpriseModal({ onClose, burstOrigin, reducedMotion }) {
  const closeButton = useRef(null)

  useEffect(() => {
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    closeButton.current?.focus()
    document.body.style.overflow = 'hidden'

    function handleKeydown(event) {
      if (event.key === 'Escape') onClose()
      if (event.key === 'Tab') {
        event.preventDefault()
        closeButton.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeydown)
      previousFocus?.focus?.()
    }
  }, [onClose])

  return (
    <motion.div className="surprise-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <AnimatePresence>{burstOrigin && <GiftBurst key="gift-burst" origin={burstOrigin} reducedMotion={reducedMotion} />}</AnimatePresence>
      <motion.section className="surprise-modal" role="dialog" aria-modal="true" aria-labelledby="surprise-title" initial={{ opacity: 0, scale: .85, y: 20, filter: 'blur(10px)' }} animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, scale: .94, y: 12, filter: 'blur(6px)' }} transition={{ duration: .62, ease: [.22, 1, .36, 1] }}>
        <button className="surprise-close" type="button" ref={closeButton} onClick={onClose} aria-label="Close birthday surprise"><X size={19} /></button>
        <p className="eyebrow">{birthdayData.surprise.eyebrow}</p>
        <h2 id="surprise-title">{birthdayData.surprise.title.replace('[NAME]', birthdayData.recipientName)}</h2>
        <p className="surprise-modal-message">{birthdayData.surprise.message}</p>
        <div className="surprise-heart-frame">
          <svg className="surprise-image-svg" viewBox="0 0 400 360" role="img" aria-labelledby="surprise-image-title">
            <title id="surprise-image-title">Shristi at a restaurant</title>
            <defs><clipPath id="surprise-photo-heart"><path d="M200 344C164 315 28 230 22 135 17 60 67 22 126 30 158 34 183 52 200 81 217 52 242 34 274 30 333 22 383 60 378 135 372 230 236 315 200 344Z" /></clipPath></defs>
            <image href={birthdayData.surprise.image} width="400" height="360" preserveAspectRatio="xMidYMid slice" clipPath="url(#surprise-photo-heart)" />
            <path className="surprise-heart-outline" d="M200 344C164 315 28 230 22 135 17 60 67 22 126 30 158 34 183 52 200 81 217 52 242 34 274 30 333 22 383 60 378 135 372 230 236 315 200 344Z" />
          </svg>

        </div>
        <span className="surprise-modal-signoff">With love, {birthdayData.senderName}</span>
      </motion.section>
    </motion.div>
  )
}

function Surprise() {
  const [opened, setOpened] = useState(false)
  const [showSurprise, setShowSurprise] = useState(false)
  const [burstOrigin, setBurstOrigin] = useState(null)
  const burstTimer = useRef(null)
  const revealTimer = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => () => {
    window.clearTimeout(burstTimer.current)
    window.clearTimeout(revealTimer.current)
  }, [])

  function openGift(event) {
    if (opened) return
    setOpened(true)
    window.clearTimeout(burstTimer.current)
    window.clearTimeout(revealTimer.current)
    if (!reduceMotion) {
      const bounds = event.currentTarget.getBoundingClientRect()
      setBurstOrigin({ x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2 })
      burstTimer.current = window.setTimeout(() => setBurstOrigin(null), 1900)
    }
    revealTimer.current = window.setTimeout(() => setShowSurprise(true), reduceMotion ? 0 : 420)
  }

  const closeSurprise = useCallback(() => {
    window.clearTimeout(burstTimer.current)
    window.clearTimeout(revealTimer.current)
    setShowSurprise(false)
    setBurstOrigin(null)
    setOpened(false)
  }, [])

  return (
    <section className="surprise-section" id="surprise">
      <Stars />
      <Reveal className="surprise-copy">
        <p className="eyebrow">One last little thing</p>
        <h2>There's a little magic<br /><em>with your name on it.</em></h2>
        <p className="surprise-note">No peeking. Well, just one.</p>
        <button type="button" className={`gift-button ${opened ? 'opened' : ''}`} onClick={openGift} aria-expanded={opened}>
          <motion.span className="gift-box" animate={opened && !reduceMotion ? { y: [0, -14, 5, 0], rotate: [0, -3, 3, 0] } : {}} transition={{ duration: .7 }}>
            <i className="gift-lid" /><i className="gift-body" />
          </motion.span>
          <span>{opened ? 'A little gift, just for you' : 'Tap to open your gift'}</span>
        </button>
      </Reveal>
      {createPortal(<AnimatePresence>{showSurprise && <SurpriseModal key="surprise-modal" onClose={closeSurprise} burstOrigin={burstOrigin} reducedMotion={reduceMotion} />}</AnimatePresence>, document.body)}
    </section>
  )
}

function Closing() {
  return <footer className="closing-section"><Stars /><MoonMark className="closing-moon" /><Reveal><p className="eyebrow">And this is only the beginning</p><h2>Happy birthday,<br /><em>{birthdayData.recipientName}.</em></h2><p className="closing-message">Here's to another year of beautiful memories. {birthdayData.closing.message}</p><span className="closing-heart"><Heart size={17} fill="currentColor" /></span><p className="closing-credit">A little world, made with love by {birthdayData.senderName}</p></Reveal><a className="back-top" href="#top"><ArrowLeft size={14} /> Back to the beginning</a></footer>
}

function App() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    document.title = `A Little World for ${birthdayData.recipientName}`
    const timer = window.setTimeout(() => setLoading(false), 1050)
    return () => window.clearTimeout(timer)
  }, [])

  return <><AnimatePresence>{loading && <LoadingExperience key="loading" />}</AnimatePresence><div className={`site-shell ${loading ? '' : 'is-ready'}`}><Hero /><main><Stars /><FloatingHearts /><Letter /><Reasons /><Memories /><VoiceNote /><Letters /><Surprise /><Closing /></main></div><HeartCursor /><CurtainReveal /></>
}

export default App
