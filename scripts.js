document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");
    const feedUrl = "https://api.allorigins.win/get?url=" + encodeURIComponent("https://alsunnahalislam.blogspot.com/feeds/posts/default?alt=json");

    function displayXMLPost(post) {
      const title = post.getElementsByTagName("title")[0]?.textContent || "Untitled";
      const contentHTML = post.getElementsByTagName("content")[0]?.textContent || "No content available.";
      const publishedDate = post.getElementsByTagName("published")[0]?.textContent.split("T")[0] || "Unknown date";
      const link = Array.from(post.getElementsByTagName("link"))
        .find(l => l.getAttribute("rel") === "alternate")
        ?.getAttribute("href") || "#";
    
      const postElement = document.createElement("div");
      postElement.classList.add("post");
      postElement.innerHTML = `
        <h2>${title}</h2>
        <p><strong>Published:</strong> ${publishedDate}</p>
        <div>${contentHTML.substring(0, 150)}...</div>
        <a href="${link}" target="_blank">Read More</a>
      `;
      content.appendChild(postElement);
    }

    // Try loading from live Blogger JSON feed first
    fetch(feedUrl)
      .then(response => {
        if (!response.ok) throw new Error("Primary feed failed");
        return response.json();
      })
      .then(data => {
          console.log("JSON response:", data);
          const posts = data.feed?.entry;
          if (!posts || posts.length === 0) {
            throw new Error("No posts in JSON feed");
          }
          posts.forEach(displayJSONPost);
      })
      .catch(error => {
        console.warn("Primary feed failed, falling back to blogdata.xml:", error.message);
    
        // Fallback to local XML file
        fetch("blogdata.xml")
          .then(response => response.text())
          .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "application/xml");
    
            if (xmlDoc.querySelector("parsererror")) {
              content.innerHTML = "<p>Error loading backup XML. Please check the file.</p>";
              return;
            }
    
            const posts = Array.from(xmlDoc.getElementsByTagName("entry"))
              .filter(entry =>
                entry.querySelector("category[term='http://schemas.google.com/blogger/2008/kind#post']")
              );
    
            if (posts.length === 0) {
              content.innerHTML = "<p>No posts available in backup.</p>";
            } else {
              posts.forEach(displayXMLPost);
            }
          })
          .catch(fallbackError => {
            console.error("Error loading fallback XML:", fallbackError);
            content.innerHTML = "<p>Failed to load blog posts from both sources.</p>";
          });
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
