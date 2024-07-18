const axios = require("axios");
const Game = require("../models/game");
const {fetchGenreNames, fetchPlatformNames, fetchCovers, fetchCover, fetchSs} = require("./fetch");
require('dotenv').config();


const headers = {
    "Client-ID": process.env.CLIENT_ID,
    "Authorization": `Bearer ${process.env.AUTHORIZATION}`
};
const URL = process.env.IGDB_API_URL;

// Method to return the newest games from IGDB to display in the main slider of the app
exports.getGames = async (req, res) => {
    try {
        const thisYear = new Date().getFullYear();
        const response = await axios.post(
            //IGDB endpoint
            `${URL}/games`,
            //IGDB query
            `fields id, name, first_release_date, genres, platforms, summary, total_rating, cover, themes.name, hypes;
             where first_release_date >= ${Math.floor(new Date(thisYear, 0, 1) / 1000)}
             & first_release_date < ${Math.floor(new Date(thisYear + 1, 0, 1) / 1000)};
             sort first_release_date desc; sort hypes desc; limit 10;`,
            { headers }
        );
        const gamesData = response.data;
        
        //turn Ids into names
        const genreIds = [...new Set(gamesData.flatMap(game => game.genres || []))];
        const platformIds = [...new Set(gamesData.flatMap(game => game.platforms || []))];
        const coverIds = [...new Set(gamesData.map(game => game.cover).filter(Boolean))];

        const genreNames = await fetchGenreNames(genreIds, headers);
        const platformNames = await fetchPlatformNames(platformIds, headers);
        const coverUrls = await fetchCovers(coverIds);

        //structure the returned game object
        const saveGames = gamesData.map(game => {
            return {
                id: game.id,
                title: game.name,
                img: coverUrls[game.cover] || "No cover available",
                releaseDate: game.first_release_date ? new Date(game.first_release_date * 1000) : null,
                genres: game.genres && game.genres.length > 0 ? game.genres.map(id => genreNames[id] || "Unknown").join(", ") : "Unknown",
                platforms: game.platforms && game.platforms.length > 0 ? game.platforms.map(id => platformNames[id] || "Unknown").join(", ") : "Unknown",
                summary: game.summary || "No summary available",
                rating: game.total_rating !== undefined ? Math.floor(game.total_rating / 20) : "-1"
            }
         });

        //save games in database
        await Game.insertMany(saveGames);

        //return saved games upon request
         res.json(saveGames);

    } catch (error) {
        res.status(500).send({error: error.message});
    }
};

//Method to return most played games by manipulating IGDB query
exports.getMostPlayed = async (req, res) => {
    try {
        const response = await axios.post(
            `${URL}/games`,
            "fields id, name, first_release_date, genres, platforms, summary, cover, total_rating, total_rating_count; sort total_rating_count desc; limit 10;",
            { headers }
        );
        const gamesData = response.data;

        const genreIds = [...new Set(gamesData.flatMap(game => game.genres || []))];
        const platformIds = [...new Set(gamesData.flatMap(game => game.platforms || []))];
        const coverIds = [...new Set(gamesData.map(game => game.cover).filter(Boolean))];

        const genreNames = await fetchGenreNames(genreIds, headers);
        const platformNames = await fetchPlatformNames(platformIds, headers);
        const coverUrls = await fetchCovers(coverIds);

        const saveGames = gamesData.map(game => {
            return {
                id: game.id,
                title: game.name,
                img: coverUrls[game.cover] || "No cover available",
                releaseDate: game.first_release_date ? new Date(game.first_release_date * 1000) : null,
                genres: game.genres && game.genres.length > 0 ? game.genres.map(id => genreNames[id] || "Unknown").join(", ") : "Unknown",
                platforms: game.platforms && game.platforms.length > 0 ? game.platforms.map(id => platformNames[id] || "Unknown").join(", ") : "Unknown",
                summary: game.summary || "No summary available",
                rating: game.total_rating !== undefined ? Math.floor(game.total_rating / 20) : "-1"
                
            }
         });

         await Game.insertMany(saveGames);


         res.json(saveGames);

    } catch (error) {
        res.status(500).send({error: error.message});
    }
};

//Method to get the top rated games in the IGDB
exports.getTopRated = async (req, res) => {
    try {
        const response = await axios.post(
            `${URL}/games`,
            "fields name, id, first_release_date, genres, platforms, summary, total_rating, cover; limit 10; sort total_rating desc;",
            { headers }
        );
        const gamesData = response.data;

        const genreIds = [...new Set(gamesData.flatMap(game => game.genres || []))];
        const platformIds = [...new Set(gamesData.flatMap(game => game.platforms || []))];
        const coverIds = [...new Set(gamesData.map(game => game.cover).filter(Boolean))];

        const genreNames = await fetchGenreNames(genreIds, headers);
        const platformNames = await fetchPlatformNames(platformIds, headers);
        const coverUrls = await fetchCovers(coverIds);

        const saveGames = gamesData.map(game => {
            return {
                id: game.id,
                title: game.name,
                img: coverUrls[game.cover] || "No cover available",
                releaseDate: game.first_release_date ? new Date(game.first_release_date * 1000) : null,
                genres: game.genres && game.genres.length > 0 ? game.genres.map(id => genreNames[id] || "Unknown").join(", ") : "Unknown",
                platforms: game.platforms && game.platforms.length > 0 ? game.platforms.map(id => platformNames[id] || "Unknown").join(", ") : "Unknown",
                summary: game.summary || "No summary available",
                rating: game.total_rating !== undefined ? Math.floor(game.total_rating / 20) : "-1"
            }
         });

         await Game.insertMany(saveGames);
         res.json(saveGames);

    } catch (error) {
        res.status(500).send({error: error.message});
    }
};

//Method for another page (games/:id) to get game details upon clicking on a game
exports.getGameDetails = async (req, res) => {
    try {
        const response = await axios.post(
            `${URL}/games`,
            `fields name, first_release_date, genres, platforms, summary, storyline, total_rating, cover, screenshots; where id = ${req.params.id};`,
            { headers }
        );
        const gameData = response.data[0];

        if (!gameData)
            return res.status(404).send({ error: "Game not found"});


        const genreNames = await fetchGenreNames(gameData.genres || [], headers);
        const platformNames = await fetchPlatformNames(gameData.platforms || [], headers);
        const coverUrl = await fetchCover(gameData.cover);
        const ssUrls = await fetchSs(gameData.screenshots);


        const gameDetails = {
            title: gameData.name,
            img: coverUrl[gameData.cover] || "No cover available",
            releaseDate: gameData.first_release_date ? new Date(gameData.first_release_date * 1000) : null,
            genres: gameData.genres && gameData.genres.length > 0 ? gameData.genres.map(id => genreNames[id] || "Unknown").join(", ") : "Unknown",
            platforms: gameData.platforms && gameData.platforms.length > 0 ? gameData.platforms.map(id => platformNames[id] || "Unknown").join(", ") : "Unknown",
            summary: gameData.summary || "No summary available",
            storyline: gameData.storyline || "No storyline available",
            rating: gameData.total_rating !== undefined ? Math.floor(gameData.total_rating / 20) : "-1",
            screenshots: ssUrls.length > 0 ? ssUrls : "No screenshots available"
        };
         const saveGameDetails = await Game.create(gameDetails);
         res.json(saveGameDetails);
    } catch (error) {
        console.error('Error fetching game data:', error.response ? error.response.data : error.message);
        res.status(500).send({error: error.message});
    }
};

//Method for the search feature
exports.searchGames = async (req, res) => {
    try{
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ error: 'Query parameter is required' });
        }
        const games = await Game.find({ $text: { $search: query } });
        res.send(games);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}