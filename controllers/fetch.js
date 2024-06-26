const axios = require("axios");

const headers = {
    "Client-ID": "bkdjeiv6sne2h4ept0j15le07uotbx",
    "Authorization": "Bearer u3brly0vtmexbbqd3le7gy0jcay9qp"
};

const fetchGenreNames = async (genreIds, headers) => {
    try {
        const response = await axios.post(
            "https://api.igdb.com/v4/genres",
            `fields name; where id = (${genreIds.join(",")});`,
            { headers }
        );
        return response.data.reduce((acc, genre) => {
            acc[genre.id] = genre.name;
            return acc;
        }, {});
    } catch (error) {
        console.error("Error fetching genres:", error.message);
        return {};
    }
};

const fetchPlatformNames = async (platformIds, headers) => {
    try {
        const response = await axios.post(
            "https://api.igdb.com/v4/platforms",
            `fields name; where id = (${platformIds.join(",")});`,
            { headers }
        );
        return response.data.reduce((acc, platform) => {
            acc[platform.id] = platform.name;
            return acc;
        }, {});
    } catch (error) {
        console.error("Error fetching platforms:", error.message);
        return {};
    }
};

const fetchCovers = async (coverIds) => {
    try {
        const response = await axios.post(
            "https://api.igdb.com/v4/covers",
            `fields url; where id = (${coverIds.join(",")});`,
            { headers }
        );

        const coverUrl = {};
        response.data.forEach(img => {
            coverUrl[img.id] = img.url;
        });
        
        return coverUrl;
    } catch (error) {
        console.error("Error fetching covers:", error.message);
        return {};
    }
};
module.exports = { fetchGenreNames, fetchPlatformNames, fetchCovers };