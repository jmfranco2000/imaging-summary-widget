function positionWidget(widget, button) {
  if (!widget || !button) return;

  const rect = button.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  // Reset temporal para medir altura real
  widget.style.top = '10px';
  widget.style.right = `${window.innerWidth - rect.left}px`;

  const widgetHeight = widget.offsetHeight;

  let topPosition = rect.top;

  // Si se sale por abajo, subirlo
  if (topPosition + widgetHeight > viewportHeight) {
    topPosition = viewportHeight - widgetHeight - 10;
  }

  // Nunca pegarlo arriba completamente
  if (topPosition < 10) {
    topPosition = 10;
  }

  widget.style.top = `${topPosition}px`;

  const pointer = widget.querySelector('.widget-pointer');
  if (pointer) {
    const buttonCenterOffset = rect.top + rect.height / 2;
    let pointerPosition = buttonCenterOffset - topPosition - 10;

    // límites del pointer
    if (pointerPosition < 10) pointerPosition = 10;
    if (pointerPosition > widgetHeight - 30) pointerPosition = widgetHeight - 30;

    pointer.style.top = `${pointerPosition}px`;
  }
}

function toggleWidget(widgetId, button) {
  const widgets = document.querySelectorAll('.widget');
  const buttons = document.querySelectorAll('.submenu-button');
  const selectedWidget = document.getElementById(widgetId);

  if (!selectedWidget) return;

  const willOpen = !selectedWidget.classList.contains('widget-visible');

  widgets.forEach(widget => widget.classList.remove('widget-visible'));
  buttons.forEach(btn => btn.classList.remove('submenu-button-active'));

  if (willOpen) {
    selectedWidget.classList.add('widget-visible');
    button.classList.add('submenu-button-active');
    positionWidget(selectedWidget, button);
  }
}

function repositionActiveWidget() {
  const activeWidget = document.querySelector('.widget.widget-visible');
  const activeButton = document.querySelector('.submenu-button.submenu-button-active');

  if (!activeWidget || !activeButton) return;

  positionWidget(activeWidget, activeButton);
}