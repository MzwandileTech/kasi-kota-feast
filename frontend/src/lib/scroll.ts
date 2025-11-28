// src/lib/scroll.ts
export function scrollToSection(id: string) {
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, 50);
}
