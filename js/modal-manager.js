function openModal(type, payload = {}) {
  const modal = document.getElementById(`modal-${type}`);
  if (!modal) return;

  // Inject dynamic content
  if (type === "report") {
    document.getElementById("modal-report-title").textContent = payload.title || "Report";
    document.getElementById("modal-report-body").textContent = payload.content || "No data available";
  }

  if (type === "lab") {
    document.getElementById("modal-lab-title").textContent = payload.title || "Lab Result";
    document.getElementById("modal-lab-body").textContent = payload.content || "No data available";
  }

  modal.classList.add("show");
}

function closeModal(type) {
  const modal = document.getElementById(`modal-${type}`);
  if (!modal) return;
  modal.classList.remove("show");
}