// Blogger feed URL (JSON format)
const feedUrl = 'https://alsunnahalislam.blogspot.com/feeds/posts/default?alt=json';

// Fetch posts from Blogger
async function fetchPosts() {
    try {
        const response = await fetch(feedUrl);
        const data = await response.json();

        // Access posts in feed
        const posts = data.feed.entry;
        const blogPostsContainer = document.getElementById('blogPosts');

        // Clear existing content
        blogPostsContainer.innerHTML = '';

        // Loop through posts and display them
        posts.forEach((post) => {
            // Extract post title, content, and link
            const title = post.title.$t;
            const content = post.content.$t; // Full content
            const link = post.link.find((l) => l.rel === 'alternate').href;

            // Create HTML for each post
            const postHTML = `
                <div class="post">
                    <h2>${title}</h2>
                    <p>${content.substring(0, 200)}...</p> <!-- Short preview -->
                    <a href="${link}" target="_blank">Read More</a>
                </div>
            `;

            // Append post to container
            blogPostsContainer.innerHTML += postHTML;
        });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        document.getElementById('blogPosts').innerHTML = '<p>Unable to load posts. Please try again later.</p>';
    }
}

// Load posts when the page loads
fetchPosts();