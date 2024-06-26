const axios = require("axios");
const Game = require("../models/game");

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


exports.getGames = async (req, res) => {
    try {
        const response = await axios.post(
            "https://api.igdb.com/v4/games",
            "fields name, first_release_date, genres, platforms, summary, rating; limit 50;",
            { headers }
        );
        const gamesData = response.data;

        const genreIds = [...new Set(gamesData.flatMap(game => game.genres || []))];
        const platformIds = [...new Set(gamesData.flatMap(game => game.platforms || []))];

        const genreNames = await fetchGenreNames(genreIds, headers);
        const platformNames = await fetchPlatformNames(platformIds, headers);

        const saveGames = gamesData.map(game => ({
            title: game.name,
            releaseDate: game.first_release_date ? new Date(game.first_release_date * 1000) : null,
            genres: game.genres && game.genres.length > 0 ? game.genres.map(id => genreNames[id] || "Unknown").join(", ") : "Unknown",
            platforms: game.platforms && game.platforms.length > 0 ? game.platforms.map(id => platformNames[id] || "Unknown").join(", ") : "Unknown",
            summary: game.summary || "No summary available",
            rating: game.rating !== undefined ? game.rating.toFixed(2) : "-1"
         }));

         await Game.insertMany(saveGames);

         res.json(saveGames);

    } catch (error) {
        res.status(500).send({error: error.message});
    }
};

exports.getGameDetails = async (req, res) => {
    const { gameId } = req.params;
    try {
        const response = await axios.post(
            "https://api.igdb.com/v4/games",
            `fields name, first_release_date, genres, platforms, storyline, summary, rating; where id = ${gameId}`,
            { headers }
        );
        const gameData = response.data[0];

        if (!gameData)
            return res.status(404).send({ error: "Game not found"});

        const gameDetails = {
            title: gameData.name,
            releaseDate: gameData.first_release_date ? new Date(gameData.first_release_date * 1000) : null,
            genres: gameData.genres && gameData.genres.length > 0 ? gameData.genres.join(", ") : "Uknown",
            platforms: gameData.platforms || [],
            summary: gameData.summary || "No summary available",
            storyline: gameData.storyline || "No storyline available",
            rating: gameData.rating !== undefined ? gameData.rating.toFixed(2) : "-1"
        };
         const saveGameDetails = await Game.create(gameDetails);
         res.json(saveGameDetails);
    } catch (error) {
        res.status(500).send({error: error.message});
    }
};