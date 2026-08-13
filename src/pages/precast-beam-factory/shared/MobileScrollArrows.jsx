import { ArrowLeft, ArrowRight } from "lucide-react";

function scrollTrack(event, direction) {
  const track = event.currentTarget.parentElement?.previousElementSibling;
  if (!track) return;
  track.scrollBy({
    left: direction * track.clientWidth * 0.84,
    behavior: "smooth",
  });
}

const buttonClass = "grid h-9 w-9 place-items-center rounded-full border border-brand-blue/20 bg-white text-brand-navy shadow-card transition hover:border-brand-blue/40 hover:text-brand-blue";

export default function MobileScrollArrows() {
  return (
    <div className="mobile-scroll-arrows mt-2 hidden items-center justify-between max-[720px]:flex" role="group" aria-label="Horizontal scroll controls" dir="ltr">
      <button type="button" onClick={(event) => scrollTrack(event, -1)} className={buttonClass} aria-label="Scroll left">
        <ArrowLeft size={17} aria-hidden="true" />
      </button>
      <span className="text-[10px] font-[800] tracking-[0.12em] text-muted uppercase" aria-hidden="true">Swipe</span>
      <button type="button" onClick={(event) => scrollTrack(event, 1)} className={buttonClass} aria-label="Scroll right">
        <ArrowRight size={17} aria-hidden="true" />
      </button>
    </div>
  );
}
