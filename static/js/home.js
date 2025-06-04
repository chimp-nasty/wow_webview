window.startScript = async function () {
  try {
    await window.pywebview.api.run_script();
    console.log("ran script")
  } catch (err) {
    alert("❌ Error: " + err.message);
  }
};