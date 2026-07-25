const progress = document.getElementById("pageProgress");
const updateProgress = () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${total > 0 ? (window.scrollY / total) * 100 : 0}%`;
};
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

const modal = document.getElementById("leadModal");
const leadForm = document.getElementById("leadForm");
const success = document.getElementById("leadSuccess");
const modalFormContent = document.getElementById("modalFormContent");

const openModal = () => {
  modal.classList.add("open");
  document.body.classList.add("modal-open");
  modal.querySelector("input, select, textarea")?.focus();
};

const closeModal = () => {
  modal.classList.remove("open");
  document.body.classList.remove("modal-open");
};

document.querySelectorAll("[data-open-lead]").forEach((button) => {
  button.addEventListener("click", openModal);
});

document.getElementById("modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

leadForm.addEventListener("submit", (event) => {
  event.preventDefault();
  modalFormContent.style.display = "none";
  success.style.display = "block";
});
