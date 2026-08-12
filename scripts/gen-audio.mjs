import { writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'audio')
mkdirSync(dir, { recursive: true })

function writeWav(filename, samples, sampleRate = 22050) {
  const dataLength = samples.length * 2
  const buffer = Buffer.alloc(44 + dataLength)
  buffer.write('RIFF', 0)
  buffer.writeUInt32LE(36 + dataLength, 4)
  buffer.write('WAVE', 8)
  buffer.write('fmt ', 12)
  buffer.writeUInt32LE(16, 16)
  buffer.writeUInt16LE(1, 20)
  buffer.writeUInt16LE(1, 22)
  buffer.writeUInt32LE(sampleRate, 24)
  buffer.writeUInt32LE(sampleRate * 2, 28)
  buffer.writeUInt16LE(2, 32)
  buffer.writeUInt16LE(16, 34)
  buffer.write('data', 36)
  buffer.writeUInt32LE(dataLength, 40)
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]))
    buffer.writeInt16LE((s * 32767) | 0, 44 + i * 2)
  }
  writeFileSync(join(dir, filename), buffer)
  console.log('wrote', filename)
}

const sr = 22050

// Soft forest ambient loop (~4s)
{
  const n = sr * 4
  const samples = new Float32Array(n)
  for (let i = 0; i < n; i++) {
    const t = i / sr
    const a =
      Math.sin(2 * Math.PI * 55 * t) * 0.04 +
      Math.sin(2 * Math.PI * 82.5 * t) * 0.03 +
      Math.sin(2 * Math.PI * 110 * t) * 0.02 +
      (Math.random() * 2 - 1) * 0.008
    const env = 0.85 + 0.15 * Math.sin(2 * Math.PI * 0.25 * t)
    samples[i] = a * env
  }
  writeWav('ambient.wav', samples)
}

// Soft UI click
{
  const n = Math.floor(sr * 0.06)
  const samples = new Float32Array(n)
  for (let i = 0; i < n; i++) {
    const t = i / sr
    samples[i] = Math.sin(2 * Math.PI * 660 * t) * Math.exp(-t * 50) * 0.15
  }
  writeWav('click.wav', samples)
}

// Player melee hit thud
{
  const n = Math.floor(sr * 0.18)
  const samples = new Float32Array(n)
  for (let i = 0; i < n; i++) {
    const t = i / sr
    const env = Math.exp(-t * 28)
    samples[i] =
      (Math.sin(2 * Math.PI * (90 - t * 200) * t) * 0.5 + (Math.random() * 2 - 1) * 0.25) * env
  }
  writeWav('hit.wav', samples)
}

// Victory chime
{
  const n = Math.floor(sr * 0.55)
  const samples = new Float32Array(n)
  const notes = [523.25, 659.25, 783.99]
  for (let i = 0; i < n; i++) {
    const t = i / sr
    let v = 0
    notes.forEach((f, idx) => {
      const start = idx * 0.08
      if (t >= start) {
        const local = t - start
        v += Math.sin(2 * Math.PI * f * local) * Math.exp(-local * 4) * 0.22
      }
    })
    samples[i] = v
  }
  writeWav('victory.wav', samples)
}

// Ambush / patrol sting — low brass dread
{
  const n = Math.floor(sr * 1.1)
  const samples = new Float32Array(n)
  for (let i = 0; i < n; i++) {
    const t = i / sr
    const env = Math.min(1, t * 4) * Math.exp(-t * 1.6)
    const tone =
      Math.sin(2 * Math.PI * 70 * t) * 0.35 +
      Math.sin(2 * Math.PI * 105 * t) * 0.22 +
      Math.sin(2 * Math.PI * 140 * t) * 0.12 +
      (Math.random() * 2 - 1) * 0.04 * Math.exp(-t * 3)
    samples[i] = tone * env
  }
  writeWav('ambush.wav', samples)
}

// Patrouilleur — muffled rifle crack
{
  const n = Math.floor(sr * 0.35)
  const samples = new Float32Array(n)
  for (let i = 0; i < n; i++) {
    const t = i / sr
    const crack = (Math.random() * 2 - 1) * Math.exp(-t * 55) * 0.7
    const body = Math.sin(2 * Math.PI * (180 - t * 400) * t) * Math.exp(-t * 18) * 0.35
    const echo = Math.sin(2 * Math.PI * 90 * t) * Math.exp(-t * 6) * 0.15
    samples[i] = crack + body + echo
  }
  writeWav('enemy-patrouilleur.wav', samples)
}

// Milicien — heavier volley / bayonet clash
{
  const n = Math.floor(sr * 0.42)
  const samples = new Float32Array(n)
  for (let i = 0; i < n; i++) {
    const t = i / sr
    const crack1 = (Math.random() * 2 - 1) * Math.exp(-t * 48) * 0.55
    const crack2 =
      t > 0.07 ? (Math.random() * 2 - 1) * Math.exp(-(t - 0.07) * 40) * 0.4 : 0
    const steel =
      Math.sin(2 * Math.PI * (420 - t * 500) * t) * Math.exp(-t * 12) * 0.28 +
      Math.sin(2 * Math.PI * 880 * t) * Math.exp(-t * 30) * 0.12
    samples[i] = crack1 + crack2 + steel
  }
  writeWav('enemy-milicien.wav', samples)
}

// Shield / evade
{
  const n = Math.floor(sr * 0.22)
  const samples = new Float32Array(n)
  for (let i = 0; i < n; i++) {
    const t = i / sr
    samples[i] =
      (Math.sin(2 * Math.PI * 520 * t) * 0.2 +
        Math.sin(2 * Math.PI * 780 * t) * 0.12 +
        (Math.random() * 2 - 1) * 0.08) *
      Math.exp(-t * 14)
  }
  writeWav('evade.wav', samples)
}

// Ultimate swell
{
  const n = Math.floor(sr * 0.7)
  const samples = new Float32Array(n)
  for (let i = 0; i < n; i++) {
    const t = i / sr
    const swell = Math.min(1, t * 5) * Math.exp(-(t - 0.25) * (t > 0.25 ? 3 : 0))
    const tone =
      Math.sin(2 * Math.PI * 196 * t) * 0.2 +
      Math.sin(2 * Math.PI * 392 * t) * 0.18 +
      Math.sin(2 * Math.PI * 587 * t) * 0.12
    const noise = (Math.random() * 2 - 1) * 0.06 * Math.exp(-t * 2)
    samples[i] = (tone + noise) * swell
  }
  writeWav('ultimate.wav', samples)
}
