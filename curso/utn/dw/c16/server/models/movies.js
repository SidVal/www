var mongoose = require("mongoose");

var MovieSchema = new mongoose.Schema({
    title: { type: String },
    year: { type: Number },
    country: { type: String },
    poster: { type: String },
    seasons: { type: Number },
    genre: { type: String, enum: ["Drama", "Fantasy", "Sci-Fi", "Thriller", "Comedy"] },
    summary: { type: String },
    posterFile: { type: String }
});

var Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;