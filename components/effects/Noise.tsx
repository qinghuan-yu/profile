import { useEffect, useRef } from 'react';
import styles from './Noise.module.scss';

interface NoiseProps {
  patternSize?: number;
  patternRefreshInterval?: number;
  patternAlpha?: number;
}

export default function Noise({
  patternSize = 250,
  patternRefreshInterval = 4,
  patternAlpha = 10,
}: NoiseProps) {
  const grainRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const patternCanvas = document.createElement('canvas');
    const patternCtx = patternCanvas.getContext('2d');
    if (!ctx || !patternCtx) return;

    let frame = 0;
    let animationFrameId: number | null = null;

    patternCanvas.width = patternSize;
    patternCanvas.height = patternSize;
    const patternData = patternCtx.createImageData(patternSize, patternSize);
    const pixelDataLength = patternSize * patternSize * 4;

    const updatePattern = () => {
      for (let i = 0; i < pixelDataLength; i += 4) {
        const value = Math.random() * 255;
        patternData.data[i] = value;
        patternData.data[i + 1] = value;
        patternData.data[i + 2] = value;
        patternData.data[i + 3] = patternAlpha;
      }
      patternCtx.putImageData(patternData, 0, 0);
    };

    const drawGrain = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      const pattern = ctx.createPattern(patternCanvas, 'repeat');
      if (!pattern) return;
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, width, height);
    };

    const loop = () => {
      if (canvas.width > 0 && canvas.height > 0 && frame % patternRefreshInterval === 0) {
        updatePattern();
        drawGrain();
      }
      frame += 1;
      animationFrameId = window.requestAnimationFrame(loop);
    };

    updatePattern();
    drawGrain();
    loop();

    return () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [patternSize, patternRefreshInterval, patternAlpha]);

  return <canvas className={styles.noiseOverlay} ref={grainRef} />;
}
