const axios = require("axios");
require('dotenv').config();

const headers = {
    "Client-ID": process.env.CLIENT_ID,
    "Authorization": `Bearer ${process.env.AUTHORIZATION}`
};

const URL = process.env.IGDB_API_URL;

const fetchGenreNames = async (genreIds, headers) => {
    try {
        const response = await axios.post(
            `${URL}/genres`,
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
            `${URL}/platforms`,
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
            `${URL}/covers`,
            `fields url; where id = (${coverIds.join(",")});`,
            { headers }
        );

        const coverUrl = {};
        response.data.forEach(img => {
            coverUrl[img.id] = img.url.replace("t_thumb", "t_1080p");
        });
        
        return coverUrl;
    } catch (error) {
        console.error("Error fetching covers:", error.message);
        return {};
    }
};

const fetchCover = async (coverId) => {
    try {
        const response = await axios.post(
            `${URL}/covers`,
            `fields url; where id = ${coverId};`,
            { headers }
        );

        if (response.data.length === 0) {
            return { [coverId]: "No cover available" };
        }

        const coverUrl = {};
        coverUrl[coverId] = response.data[0].url;
        return coverUrl;
    } catch (error) {
        console.error("Error fetching covers:", error.message);
        return { [coverId]: "No cover available" };
    }
};

const fetchSs = async (ssIds) => {
    try {
        const response = await axios.post(
            `${URL}/screenshots`,
            `fields url; where id = (${ssIds.join(",")});`,
            { headers }
        );
        return response.data.map(screenshot => screenshot.url);
    } catch (error) {
        console.error("Error fetching screenshots:", error.message);
        return {};
    }
};

module.exports = { fetchGenreNames, fetchPlatformNames, fetchCovers, fetchCover, fetchSs };