import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-1.jpg";

export const Hero = () => {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative h-[90vh] min-h-[650px] w-full overflow-hidden bg-background">

      {/* IMAGE AS REAL IMG — PREVENTS BLUR */}
      <img
        src={heroImage}
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover object-center"
        draggable="false"
      />

      {/* VERY SOFT BLACK SHADE JUST TO IMPROVE READABILITY */}
      <div className="absolute inset-0 bg-black/30" />

      {/* VERY LIGHT RIGHT FADE — DOESN'T HIDE CONTENT ANYMORE */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

      {/* CONTENT */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-4 py-10 md:py-20">
          <div className="max-w-3xl space-y-6 md:space-y-8">

            <h1 className="text-balance text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)]">
              <span className="text-primary block">REAL</span>
              KASI FLAVOR
            </h1>

            <div className="w-24 h-2 bg-primary/80 rounded-full my-2" />

            <p className="text-xl md:text-2xl text-white/90 max-w-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
              Elevating the legendary Kota into a culinary masterpiece, driven by bold flavors and genuine township spirit.
            </p>

            <div className="flex flex-wrap gap-4 pt-6">
              <Button
                size="lg"
                className="text-lg font-bold px-10 py-7 rounded-full shadow-xl hover:scale-105 transition-transform"
                onClick={() => scrollTo("footer")}
              >
                Contact Us
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="text-lg font-bold px-10 py-7 rounded-full border-2 text-black border-white/60 hover:bg-white hover:text-black transition-all"
                onClick={() => scrollTo("products")}
              >
                View Menu
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div
        role="button"
        aria-label="Scroll to products"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 cursor-pointer animate-bounce text-center"
        onClick={() => scrollTo("products")}
      >
        <div className="text-white text-4xl">&#x2193;</div>
        <p className="text-sm text-white/80 hidden md:block">Scroll Down</p>
      </div>
    </section>
  );
};
