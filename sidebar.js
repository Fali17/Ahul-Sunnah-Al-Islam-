function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.querySelector('.main-content');
  
  sidebar.classList.toggle('open');
  mainContent.classList.toggle('shift');
}