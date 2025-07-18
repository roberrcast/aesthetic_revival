// Funciones

const insertArtworkInfo = (artwork, iiif_url) => {
    const image = document.querySelector(".gallery__img");
    image.src = `${iiif_url}/${artwork.image_id}/full/843,/0/default.jpg`;

    const title = document.querySelector(".gallery__title");
    title.textContent = artwork.title;

    const date = document.querySelector(".gallery__date-display");
    date.textContent = artwork.date_display;

    const artist = document.querySelector(".gallery__artist");
    artist.textContent = artwork.artist_display;

    const description = document.querySelector(".gallery__description");
    description.innerHTML = artwork.description;
};

const pullArtworkId = async () => {
    const urlParam = new URLSearchParams(window.location.search);

    const artworkId = urlParam.get("id");

    try {
        const response = await axios.get(
            `https://api.artic.edu/api/v1/artworks/${artworkId}`,
            {
                params: {
                    fields: "id,image_id,title,date_display,artist_display,description",
                },
            },
        );

        const iiif_url = response.data.config.iiif_url;
        const artwork = response.data.data;

        insertArtworkInfo(artwork, iiif_url);
    } catch (error) {
        console.log("Couldn't fetch data: ", error);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    pullArtworkId();
});
