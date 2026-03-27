"use client";

import { useEffect, useRef } from "react";

interface ParticleSphereProps {
  className?: string;
  count?: number;
  color?: string;
  opacity?: number;
}

export function ParticleSphere({
  className,
  count = 1800,
  color = "#a78bfa",
  opacity = 0.55,
}: ParticleSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animationId: number;
    let disposed = false;

    const init = async () => {
      const canvas = canvasRef.current;
      if (!canvas || disposed) return;

      const THREE = await import("three");
      if (disposed) return;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        55,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        100
      );
      camera.position.z = 2.8;

      const positions = new Float32Array(count * 3);
      const golden = Math.PI * (3 - Math.sqrt(5));

      for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const theta = golden * i;
        positions[i * 3] = Math.cos(theta) * r;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = Math.sin(theta) * r;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const mat = new THREE.PointsMaterial({
        size: 0.011,
        color: new THREE.Color(color),
        transparent: true,
        opacity,
        sizeAttenuation: true,
        depthWrite: false,
      });

      const sphere = new THREE.Points(geo, mat);
      scene.add(sphere);

      // Responsive resize
      const ro = new ResizeObserver(() => {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      });
      ro.observe(canvas);
      const w = canvas.clientWidth || 300;
      const h = canvas.clientHeight || 200;
      renderer.setSize(w, h, false);

      // Animate
      let t = 0;
      const animate = () => {
        if (disposed) return;
        animationId = requestAnimationFrame(animate);
        t += 0.004;
        sphere.rotation.y = t * 0.22;
        sphere.rotation.x = Math.sin(t * 0.18) * 0.14;
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        ro.disconnect();
        geo.dispose();
        mat.dispose();
        renderer.dispose();
      };
    };

    const cleanupPromise = init();

    return () => {
      disposed = true;
      cancelAnimationFrame(animationId);
      cleanupPromise.then((fn) => fn?.());
    };
  }, [count, color, opacity]);

  return <canvas ref={canvasRef} className={className} />;
}
