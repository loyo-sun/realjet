import { useLayoutEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

function scrollTrack(event, direction) {
  const track = event.currentTarget.parentElement?.previousElementSibling;
  if (!track) return;
  track.scrollBy({
    left: direction * track.clientWidth * 0.84,
    behavior: "smooth",
  });
}

export default function MobileScrollArrows() {
  const controlsRef = useRef(null);

  useLayoutEffect(() => {
    const controls = controlsRef.current;
    const track = controls?.previousElementSibling;
    if (!controls || !track) return undefined;

    const syncTrackHeight = () => {
      controls.style.setProperty("--mobile-track-height", `${track.offsetHeight}px`);
    };

    syncTrackHeight();
    const observer = new ResizeObserver(syncTrackHeight);
    observer.observe(track);
    window.addEventListener("resize", syncTrackHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncTrackHeight);
    };
  }, []);

  return (
    <div ref={controlsRef} className="mobile-scroll-arrows hidden max-[720px]:block" role="group" aria-label="Horizontal scroll controls" dir="ltr">
      <button type="button" onClick={(event) => scrollTrack(event, -1)} className="precast-carousel-control precast-carousel-control-left" aria-label="Scroll left">
        <ArrowLeft size={17} aria-hidden="true" />
      </button>
      <button type="button" onClick={(event) => scrollTrack(event, 1)} className="precast-carousel-control precast-carousel-control-right" aria-label="Scroll right">
        <ArrowRight size={17} aria-hidden="true" />
      </button>
    </div>
  );
}
