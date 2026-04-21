function initStratumTabs() {
  const tabs = document.querySelectorAll('.stratum-tab');
  const panels = document.querySelectorAll('.stratum-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.panel;
      if (!target) return;

      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');

      const panel = document.getElementById(`panel-${target}`);
      if (panel) {
        panel.classList.add('active');
      }

      requestAnimationFrame(() => {
        repositionActiveWidget();
      });
    });
  });
}

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    if (typeof closeDetailModal === 'function') closeDetailModal();
    if (typeof closeAboutModal === 'function') closeAboutModal();
  }
});

window.addEventListener('resize', () => {
  repositionActiveWidget();
});

document.addEventListener('DOMContentLoaded', async function () {
  try {
    if (typeof loadStratumOverview === 'function') {
      await loadStratumOverview();
    }

    if (typeof loadStratumImaging === 'function') {
      await loadStratumImaging();
    }

    if (typeof loadStratumLaboratory === 'function') {
      await loadStratumLaboratory();
    }
  } catch (error) {
    console.error(error);
  }

  initStratumTabs();

  const triggerButton = document.getElementById('trigger-button');
  if (triggerButton) {
    toggleWidget('recording-widget', triggerButton);
  }
});