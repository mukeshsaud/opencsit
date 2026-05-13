"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  // e.g. ["semester", "first", "math", "chapter-1"]
  const isHome=segments.length===0;
  
  let heading = "Pick your semester";
  const breadcrumbs = [];

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];  // ← was missing, caused "seg is undefined"
    const isLast = i === segments.length - 1;

    if (i === 0) {
    
      // "semester" segment → skip adding to breadcrumbs
      continue;
    }

    if (i === 1) {
        const label = seg[0].toUpperCase() + seg.slice(1).replace(/-/g, " ") + " Semester";
      const href = "/" + segments.slice(0, i + 1).join("/");
      heading = label;
      breadcrumbs.push({ href, label, isLast });
      // skip the literal word "semester" in the path
      continue;
    }

    if (i === 2) {
       heading = seg[0].toUpperCase() + seg.slice(1).replace(/-/g, " ");
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-semibold text-xl md:text-3xl">{heading}</h1>

      <div className="font-extralight font-manrope whitespace-nowrap text-xs md:text-lg flex items-center gap-1">
        {isHome ?
        <div>
        Explore syllabus, notes,and question papers.
       </div>:
        <Link className="hover:text-[#0088FF] cursor-pointer" href="/">
          Home
        </Link>
        }

        {breadcrumbs.map(({ href, label, isLast }) => (
          <span key={href} className="flex items-center gap-1">
            <span>//</span>
            {isLast ? (
              <span className="text-[#0088FF] cursor-pointer">{label}</span>
            ) : (
              <Link className="hover:text-[#0088FF] cursor-pointer" href={href}>
                {label}
              </Link>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}