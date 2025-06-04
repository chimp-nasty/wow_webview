window.loadView = async function(viewName) {
  const response = await fetch(`templates/${viewName}.html`);
  const html = await response.text();

  const container = document.getElementById('content');
  container.innerHTML = html;

  // Try to load matching JS file (optional)
  const script = document.createElement('script');
  script.src = `static/js/${viewName}.js`;
  script.onload = () => console.log(`${viewName}.js loaded`);
  script.onerror = () => console.warn(`No JS found for ${viewName}`);
  document.body.appendChild(script);
};

// Load default view
window.onload = () => loadView('login');