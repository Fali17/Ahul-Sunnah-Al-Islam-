function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.querySelector('.main-content') || document.querySelector('.logo-container');
  const overlay = document.getElementById('sidebar-overlay');

  sidebar.classList.toggle('open');
  if (mainContent) mainContent.classList.toggle('shift');

  // Show/hide overlay for mobile/small screens
  if (overlay) {
    if (sidebar.classList.contains('open')) {
      overlay.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    }
  }
}

// Optional: Close sidebar on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const sidebar = document.getElementById('sidebar');
    if (sidebar && sidebar.classList.contains('open')) {
      toggleSidebar();
    }
  }
});