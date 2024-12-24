document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");

    // Fetch and parse the XML file
    fetch("blogdata.xml")
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "application/xml");

            // Check if valid XML
            if (xmlDoc.querySelector("parsererror")) {
                content.innerHTML = "<p>Error loading posts. Please check the XML file.</p>";
                return;
            }

            // Extract and display posts
            const posts = Array.from(xmlDoc.getElementsByTagName("entry"))
                .filter(entry => entry.querySelector("category[term='http://schemas.google.com/blogger/2008/kind#post']"));

            if (posts.length === 0) {
                content.innerHTML = "<p>No posts available.</p>";
            } else {
                posts.forEach(post => displayPost(post));
            }
        })
        .catch(error => {
            content.innerHTML = `<p>Error loading posts: ${error.message}</p>`;
        });

    function displayPost(post) {
    const title = post.querySelector("title").textContent;
    const publishedDate = post.querySelector("published").textContent.split("T")[0];
    const contentSnippet = post.querySelector("content")?.textContent.substring(0, 200) || "No content available.";

    const postDiv = document.createElement("div");
    postDiv.className = "post";
    postDiv.innerHTML = `
        <h2>${title}</h2>
        <p><strong>Published:</strong> ${publishedDate}</p>
        <p>${contentSnippet}...</p>
        <a href="post.html?title=${encodeURIComponent(title)}" target="_blank">Read More</a>
    `;
    content.appendChild(postDiv);
}

    // Full post view function (placeholder, to be implemented)
    window.viewFullPost = (title) => {
        alert(`Displaying full post: ${title}`);
        // You can load the full post content dynamically here.
    };
});

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.querySelector('.main-content');
  
  sidebar.classList.toggle('open');
  mainContent.classList.toggle('shift');
}