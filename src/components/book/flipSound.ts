/** Bruit de page synthétisé (Web Audio) : aucun fichier audio à charger. */
let ctx: AudioContext | null = null;

export function playFlipSound() {
  try {
    ctx ??= new AudioContext();
    const duration = 0.32;
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * duration), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      const t = i / data.length;
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 2) * (0.6 + 0.4 * Math.sin(t * 40));
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.value = 0.8;
    filter.frequency.setValueAtTime(2800, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + duration);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.22, ctx.currentTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    source.connect(filter).connect(gain).connect(ctx.destination);
    source.start();
  } catch {
    /* audio indisponible : on ignore */
  }
}
