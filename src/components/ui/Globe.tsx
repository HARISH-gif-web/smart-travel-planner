import createGlobe from "cobe";
import { useEffect, useRef } from "react";

export function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    let width = 0;
    
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    
    window.addEventListener('resize', onResize);
    onResize();

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.04, 0.06, 0.1], // match background #0b0f19 roughly
      markerColor: [0.1, 0.8, 1], // Cyan
      glowColor: [0.1, 0.2, 0.4],
      markers: [
        { location: [20.5937, 78.9629], size: 0.08 } // India
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.003;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="w-full aspect-square max-w-[500px] mx-auto relative flex items-center justify-center pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-90"
        style={{ contain: 'layout paint size' }}
      />
    </div>
  );
}
