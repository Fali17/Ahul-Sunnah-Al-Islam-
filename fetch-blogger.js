const feedUrl = "https://alsunnahalislam.blogspot.com/feeds/posts/default";

const blogContainer = document.getElementById("blog-container");

fetch(feedUrl)
    .then(response => response.json())
    .then(data => {
        const posts = data.feed.entry;

        if (!posts) {
            blogContainer.innerHTML = "<p>No posts found.</p>";
            return;
        }

        posts.forEach(post => {
            const title = post.title?.$t || "Untitled";
            const content = post.content?.$t || "No content available.";
            const publishedDate = post.published?.$t.split("T")[0] || "Unknown date";
            const link = post.link.find(l => l.rel === "alternate")?.href || "#";

            // Create and append the post element
            const postElement = document.createElement("div");
            postElement.classList.add("post");
            postElement.innerHTML = `
                <h2>${title}</h2>
                <p><strong>Published:</strong> ${publishedDate}</p>
                <div>${content.substring(0, 150)}...</div>
                <a href="${link}" target="_blank">Read More</a>
            `;
            blogContainer.appendChild(postElement);
        });
    })
    .catch(error => {
        console.error("Error fetching blog posts:", error);
        blogContainer.innerHTML = "<p>Error loading blog posts. Please try again later.</p>";
    });
