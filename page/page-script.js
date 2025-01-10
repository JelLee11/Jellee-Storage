$(document).ready(function() {
  const baseurl = "../data.json";
  let currentPage = 1;
  const perPage = 6;

  // Fetch and display data
  async function fetchAndDisplayData(page, perPage) {
    try {
      const response = await fetch(baseurl);
      const novels = await response.json();

      // Handle pagination
      const startIndex = (page - 1) * perPage;
      const endIndex = page * perPage;
      const reformNovels = novels.map(novel => ({
        id: novel.id,
        title: novel.title,
        cover: novel.cover,
        status: novel.status,
        type: novel.type,
        translation: novel.translation,
        genres: novel.genres,
        rating: novel.anilist?.rating || "N/A",
        popularity: novel.anilist?.popularity || "N/A",
        synopsis: novel.synopsis,
      }));

      const paginatedNovels = reformNovels.slice(startIndex, endIndex);

      // Append data to the `ul`
      const novelList = $("#latest-item-list");
      paginatedNovels.forEach(novel => {
        novelList.append(`
              <li>
                <h3>${novel.title}</h3>
                <img src="${novel.cover}" data-src="${novel.cover}" alt="${novel.title}" width="100"/>
                <p>Download <strong>${novel.title}</strong> both epub/pdf for free only on FNovels</p>
                <p><a class="download-btn" href="https://github.com/JelLee11/JelLee-App/releases/download/v1.0.2_BetaSnapshot101/JelLee_v1.0.2.apk"><i class="fa fa-arrow-circle-o-down" aria-hidden="true"></i> Get App Now</a></p>
              </li>
            `);
      });
      
      // Check if there's more data
      /*if (endIndex >= novels.length) {
        $("#load-more").hide();
      }*/
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Load initial data
  fetchAndDisplayData(currentPage, perPage);

  // Load more data on button click
  /*$("#load-more").on("click", function() {
    currentPage++;
    fetchAndDisplayData(currentPage, perPage);
  }); */
});