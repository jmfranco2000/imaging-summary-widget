function openDetailModal(modalData) {
  if (!modalData) return;

  const modal = document.getElementById('detail-modal');
  const title = document.getElementById('detail-modal-title');
  const subtitle = document.getElementById('detail-modal-subtitle');
  const sectionLabel = document.getElementById('detail-modal-section-label');
  const content = document.getElementById('detail-modal-content');

  title.textContent = modalData.title || 'Detail';
  subtitle.textContent = modalData.subtitle || '';
  sectionLabel.textContent = modalData.sectionLabel || 'Content';
  content.textContent = modalData.content || '';

  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
}

function closeDetailModal() {
  const modal = document.getElementById('detail-modal');
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
}

function openAboutModal() {
  const modal = document.getElementById('about-modal');
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
}

function closeAboutModal() {
  const modal = document.getElementById('about-modal');
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
}