// Funciones

const createArtwork = (artwork, iiif_url) => {
    const card = document.createElement("div");
    card.classList.add("artwork__card");

    const galleryLink = document.createElement("a");
    galleryLink.classList.add("artwork__link");
    galleryLink.href = "gallery-focus.html";

    const image = document.createElement("img");
    image.classList.add("artwork__img");
    image.src = `${iiif_url}/${artwork.image_id}/full/843,/0/default.jpg`;

    const artworkTextContainer = document.createElement("div");
    artworkTextContainer.classList.add("artwork__text-container");

    const title = document.createElement("h3");
    title.classList.add("artwork__title");
    title.textContent = artwork.title;

    const artistName = document.createElement("p");
    artistName.classList.add("artwork__text");
    artistName.textContent = artwork.artist_display.replace(/ \(.*/, "");

    artworkTextContainer.append(title, artistName);

    galleryLink.append(image, artworkTextContainer);

    card.append(galleryLink);

    return card;
};

const populateGrid = async () => {
    const artworkGrid = document.getElementById("artwork-grid");

    try {
        const response = await axios.get(
            "https://api.artic.edu/api/v1/artworks/search",
            {
                params: {
                    "query[term][is_public_domain]": true,
                    fields: "id,title,artist_display,description,is_public_domain,image_id",
                    limit: 20,
                },
            },
        );

        const iiif_url = response.data.config.iiif_url;
        const artworks = response.data.data;

        artworkGrid.innerHTML = "";

        for (const artwork of artworks) {
            const artworkCard = createArtwork(artwork, iiif_url);
            artworkGrid.append(artworkCard);
        }
    } catch (error) {
        console.log("Error fetching data:", error);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    populateGrid();
});
