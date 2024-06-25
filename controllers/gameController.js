const axios = require("axios");
const Game = require("../models/game");

exports.titles = async (req, res) => {
    try {
        const response = await axios.post("https://api.igdb.com/v4/games",
            "fields name, first_release_date, genres, platforms;",
            {
            headers: {
                "Client-ID": "bkdjeiv6sne2h4ept0j15le07uotbx",
                "Authorization": "Bearer u3brly0vtmexbbqd3le7gy0jcay9qp"
            }
        });
        res.send(response.data);

    } catch (error) {
        res.status(500).send({error: error.message});
    }
};