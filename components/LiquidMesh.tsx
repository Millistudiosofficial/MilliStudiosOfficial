"use client";
import { useEffect, useRef } from "react";

interface Node { x:number;y:number;vx:number;vy:number;size:number }

export default function LiquidMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let animId: number;
    const mouse = { x: -1000, y: -1000 };
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    const nodes: Node[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random()-.5)*.4, vy: (Math.random()-.5)*.4, size: Math.random()*1.5+.5
    }));
    const draw = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x<0||n.x>canvas.width) n.vx*=-1;
        if (n.y<0||n.y>canvas.height) n.vy*=-1;
        const dx=mouse.x-n.x,dy=mouse.y-n.y,d=Math.sqrt(dx*dx+dy*dy);
        if (d<180){ n.x+=dx*.0015; n.y+=dy*.0015; }
        ctx.beginPath(); ctx.arc(n.x,n.y,n.size,0,Math.PI*2);
        const hue = 180+Math.sin(n.x/canvas.width*Math.PI)*40;
        ctx.fillStyle=`hsla(${hue},80%,60%,0.5)`; ctx.fill();
      });
      nodes.forEach((a,i) => {
        for (let j=i+1;j<nodes.length;j++) {
          const b=nodes[j],dx=a.x-b.x,dy=a.y-b.y,dist=Math.sqrt(dx*dx+dy*dy);
          if (dist<140) {
            ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
            ctx.strokeStyle=`rgba(0,180,200,${(1-dist/140)*.25})`; ctx.lineWidth=.6; ctx.stroke();
          }
        }
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize",resize); };
  }, []);
  return <canvas ref={canvasRef} className="liquid-mesh" aria-hidden="true" />;
}
