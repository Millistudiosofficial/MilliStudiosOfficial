"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { projects } from "@/lib/data";
import { useAdmin } from "@/context/AdminContext";

type Category = "All" | "Films" | "Songs";
type SubCategory = "All" | "Own" | "Cover";

const CATEGORIES: Category[] = ["All", "Films", "Songs"];
const SONG_SUBCATEGORIES: SubCategory[] = ["All", "Own", "Cover"];

export default function ProjectMatrix() {
  const { managedProjects } = useAdmin();
  const [active, setActive] = useState<Category>("All");
  const [subActive, setSubActive] = useState<SubCategory>("All");
  const [featured, setFeatured] = useState<string|null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Filter logic
  let filtered = managedProjects;
  if (active !== "All") {
    filtered = filtered.filter(p => p.category === active);
  }
  if (active === "Songs" && subActive !== "All") {
    filtered = filtered.filter(p => p.subCategory === subActive);
  }

  const handleCard = (id: string) => setFeatured(featured===id ? null : id);

  useEffect(() => {
    if (!gridRef.current) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    const nodes = gridRef.current.querySelectorAll(".reveal");
    nodes.forEach(node => observer.observe(node));

    return () => observer.disconnect();
  }, [active, subActive]);

  return (
    <section className="section projects" id="projects" aria-labelledby="projects-title">
      <div className="section__inner">
        <div className="reveal">
          <p className="section__tag">Project Archive</p>
          <h2 className="section__title" id="projects-title">
            The Full<br/><span className="grad-text">Portfolio</span>
          </h2>
        </div>

        <div className="projects__filters reveal reveal--delay-1">
          <div className="filter-group">
            {CATEGORIES.map(cat => (
              <button 
                key={cat} 
                className={`filter-btn${active===cat?" active":""}`} 
                onClick={()=>{
                  setActive(cat);
                  setSubActive("All");
                  setFeatured(null);
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {active === "Songs" && (
            <div className="filter-group sub-filters">
              {SONG_SUBCATEGORIES.map(subCat => (
                <button 
                  key={subCat} 
                  className={`filter-btn sub-filter-btn${subActive===subCat?" active":""}`} 
                  onClick={()=>{
                    setSubActive(subCat);
                    setFeatured(null);
                  }}
                >
                  {subCat}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="projects__grid" ref={gridRef}>
          {filtered.map((p, i) => {
            const isFeatured = featured===p.id;
            const isDimmed = featured!==null && !isFeatured;
            return (
              <div
                key={p.id}
                id={`project-${p.id}`}
                className={`project-card reveal reveal--delay-${(i%3)+1}${isFeatured?" featured-card":""}${isDimmed?" dimmed":""}`}
                onClick={() => handleCard(p.id)}
              >
                <div className="project-card__thumb">
                  <div className="scanner-line" />
                  {p.image
                    ? <Image src={p.image} alt={p.title} fill style={{objectFit:"cover"}} sizes="(max-width: 768px) 100vw, 33vw"/>
                    : <div className="project-card__placeholder" style={{background:p.gradient}}>{p.emoji}</div>
                  }
                </div>
                <div className="project-card__body">
                  <p className="project-card__cat">{p.category} {p.subCategory ? `· ${p.subCategory}` : ""} · {p.year}</p>
                  <h3 className="project-card__title">{p.title}</h3>
                  <p className="project-card__sub">{p.subtitle}</p>
                  <div className="project-card__tags">
                    {p.tags.map(t=><span key={t} className="proj-tag">{t}</span>)}
                  </div>
                </div>
                {isFeatured && (
                  <div className="project-card__crew">
                    <div className="crew-row">
                      {Object.entries(p.crew).map(([k,v])=>(
                        <span key={k}><strong>{k}:</strong> {v}</span>
                      ))}
                      {p.link && p.link!="#" && (
                        <a href={p.link} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()}
                          style={{marginLeft:"auto",fontSize:".7rem",color:"var(--cyan)",textDecoration:"underline"}}>
                          Watch ↗
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {featured && (
          <p style={{textAlign:"center",marginTop:24,fontSize:".75rem",color:"var(--silver-dim)",letterSpacing:".1em"}}>
            Click card again to close · click another to switch
          </p>
        )}
      </div>
    </section>
  );
}
