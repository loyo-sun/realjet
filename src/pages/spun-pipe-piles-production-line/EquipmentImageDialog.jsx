import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function EquipmentImageDialog({ item, closeLabel = "Close enlarged image", onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!item) {
      if (dialog.open) dialog.close();
      return;
    }
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [item]);

  return (
    <dialog ref={dialogRef} aria-labelledby="equipment-photo-title"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      className="fixed inset-0 z-[100] m-auto max-h-[92svh] w-[min(1100px,94vw)] max-w-none overflow-auto rounded-xl bg-white p-0 text-brand-navy shadow-2xl backdrop:bg-black/80">
      {item && <div className="p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 id="equipment-photo-title" className="text-lg font-bold">{item.title}</h2>
          <button type="button" autoFocus onClick={onClose} aria-label={closeLabel}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-soft focus-visible:outline-2 focus-visible:outline-brand-blue"><X size={22} /></button>
        </div>
        <img src={item.image} alt={item.alt} className="h-[70svh] w-full object-contain" />
      </div>}
    </dialog>
  );
}
