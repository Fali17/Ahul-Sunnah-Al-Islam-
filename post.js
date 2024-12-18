document.addEventListener("DOMContentLoaded", () => {
    // Get the "title" parameter from the URL
    const params = new URLSearchParams(window.location.search);
    const postTitle = params.get("title");

    // Get the container for the post content
    const content = document.getElementById("post-content");

    if (!postTitle) {
        content.innerHTML = "<p>Error: No post specified.</p>";
        return;
    }

    // Fetch the XML file containing posts
    fetch("blogdata.xml")
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "application/xml");

            // Get all posts as an array
            const posts = Array.from(xmlDoc.getElementsByTagName("entry"));

            // Find the current post index
            const currentIndex = posts.findIndex(post => 
                post.querySelector("title").textContent.trim() === postTitle.trim()
            );

            if (currentIndex === -1) {
                content.innerHTML = "<p>Post not found.</p>";
                return;
            }

            // Extract current post details
            const post = posts[currentIndex];
            const title = post.querySelector("title").textContent;
            const publishedDate = post.querySelector("published").textContent.split("T")[0];
            const fullContent = post.querySelector("content").textContent;

            // Render the full post
            content.innerHTML = `
                <h1>${title}</h1>
                <p><strong>Published:</strong> ${publishedDate}</p>
                <div>${fullContent}</div>
            `;

            // Set up Back button
            document.getElementById("back-button").addEventListener("click", () => {
                if (window.history.length > 1) {
                    window.history.back();
                } else {
                    window.location.href = "index.html"; // Replace with your homepage URL
                }
            });

            // Set up Next button
            const nextButton = document.getElementById("next-button");
            if (currentIndex + 1 < posts.length) {
                nextButton.addEventListener("click", () => {
                    const nextTitle = posts[currentIndex + 1].querySelector("title").textContent;
                    window.location.href = `post.html?title=${encodeURIComponent(nextTitle)}`;
                });
            } else {
                nextButton.disabled = true; // Disable button if no next post
            }
        })
        .catch(error => {
            content.innerHTML = `<p>Error loading post: ${error.message}</p>`;
        });
});;