const Movie = require('../models/movie-model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

const axios = require('axios');


dotenv.config({
    path: '/../config.env'
});

const handleErrors = (err) => {
    console.log(err.message, err.code);
    //mname, releasedate, rating
    const errors = { mname: '', releasedate: '', rating: '' };
    if (err.code === 11000) {
        errors.message = "Cannot Add Movie!! \n The Movie already exists";
    }

    if (err.message === "Rating can't be negative") {
        err.rating = "Rating can't be negative";
    }
    if (err.message === "Date must be older than today") {
        err.releasedate = "Date must be older than today";
    }
    return errors;
}

module.exports.admin_add_movie = async (req, res) => {
    const {
        awards,
        backdrop_path,
        box_office,
        budget,
        cast,
        crew,
        genre,
        original_language,
        original_title,
        overview,
        popularity,
        poster_path,
        release_date,
        title } = req.body;
    try {
        if (popularity < 0) {
            throw Error("Rating can't be negative");
        }
        if (release_date > new Date().getDate()) {
            throw Error("Date must be older than today");
        }

        var castList = cast.split(',');
        var crewList = crew.split(',');





        const movie =
            await Movie.create({
                adult: adult,
                awards: awards,
                backdrop_path: backdrop_path,
                box_office: box_office,
                budget: budget,
                cast: castList,
                crew: crewList,
                genre: genre,
                keywords: keywords,
                original_language: original_language,
                original_title: original_title,
                overview: overview,
                popularity: popularity,
                poster_path: poster_path,
                release_date: release_date,
                title: title,
                video: video,
                vote_average: vote_average,
                vote_count: video_count
            });

        console.log("Movie Inserterd");
        res.status(201).json({ movie: movie });
    }
    catch (err) {
        // const errors = handleErrors(err);
        res.status(400).json({ err });
    }

};



module.exports.admin_add_movie_bulk = async (req, res) => {
    const { adult,
        awards,
        backdrop_path,
        box_office,
        budget,
        cast,
        crew,
        genre,
        keywords,
        original_language,
        original_title,
        overview,
        popularity,
        poster_path,
        release_date,
        title,
        video,
        vote_average,
        video_count } = req.body;
    try {
        if (popularity < 0) {
            throw Error("Rating can't be negative");
        }
        if (release_date > new Date().getDate()) {
            throw Error("Date must be older than today");
        }

        let popu = 100;

        const dates = ["2002-03-01", "2004-03-01", "2005-03-01", "2006-03-01", "2006-03-01", "2002-04-01", "2003-01-01", "2007-03-01"];
        const genress = [
            {
                "id": 28,
                "name": "Action"
            },
            {
                "id": 12,
                "name": "Adventure"
            },
            {
                "id": 16,
                "name": "Animation"
            },
            {
                "id": 35,
                "name": "Comedy"
            },
            {
                "id": 80,
                "name": "Crime"
            },
            {
                "id": 99,
                "name": "Documentary"
            },
            {
                "id": 18,
                "name": "Drama"
            },
            {
                "id": 10751,
                "name": "Family"
            },
            {
                "id": 14,
                "name": "Fantasy"
            },
            {
                "id": 36,
                "name": "History"
            },
            {
                "id": 27,
                "name": "Horror"
            },
            {
                "id": 10402,
                "name": "Music"
            },
            {
                "id": 9648,
                "name": "Mystery"
            },
            {
                "id": 10749,
                "name": "Romance"
            },
            {
                "id": 878,
                "name": "Science Fiction"
            },
            {
                "id": 10770,
                "name": "TV Movie"
            },
            {
                "id": 53,
                "name": "Thriller"
            },
            {
                "id": 10752,
                "name": "War"
            },
            {
                "id": 37,
                "name": "Western"
            }
        ];
        const m = {
            "adult": false,
            "awards": [
                "A", "B", "C"
            ],
            "backdrop_path": "/iJQIbOPm81fPEGKt5BPuZmfnA54.jpg",
            "box_office": 9000000,
            "cast": [
                "Soham Seth",
                "Virat Kolhi"
            ],
            "crew": [
                "Sameer Bramhecha"
            ],
            "genre": [

            ],
            "original_language": "en",
            "original_title": "Creed ",
            "overview": "After dominating the boxing world, Soham Seth has been thriving in both his career and family life. When a childhood friend and former boxing prodigy, Omkar Khade, resurfaces after serving a long sentence in prison, he is eager to prove that he deserves his shot in the ring. The face-off between former friends is more than just a fight. To settle the score, Adonis must put his future on the line to battle Damian — a fighter who has nothing to lose.",
            "popularity": popu,
            "poster_path": "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
            "release_date": "2002-03-01",
            "title": "Creed IIII",
            "video": false,
            "vote_average": 7.3,
            "vote_count": 1270
        }

        let names = [
            "Toy Story",
            "Avengers: Endgame",
            "The Shawshank Redemption",
            "The Godfather",
            "Interstellar",
            "Fight Club",
            "Avengers: Infinity War",
            "The Dark Knight",
            "The Lord of the Rings: The Return of the King",
            "Iron man"
        ]

        let back = [
            "/3CxUndGhUcZdt1Zggjdb2HkLLQX.jpg",
            "/hiHGRbyTcbZoLsYYkO4QiCLYe34.jpg",
            "/iJQIbOPm81fPEGKt5BPuZmfnA54.jpg",
            "/b9UCfDzwiWw7mIFsIQR9ZJUeh7q.jpg",
            "/nDxJJyA5giRhXx96q1sWbOUjMBI.jpg",
            "/8rpDcsfLJypbO6vREc0547VKqEv.jpg",
            "/44immBwzhDVyjn87b3x3l9mlhAD.jpg",
            "/cWDWUkIR22FSlxokhaNrT6jqX3n.jpg",
            "/5i6SjyDbDWqyun8klUuCxrlFbyw.jpg",
            "/xwA90BwZXTh8ke3CVsQlj8EOkFr.jpg",
        ];

        let front = [
            "/ngl2FKBlU4fhbdsrtdom9LVLBXw.jpg", "/9JBEPLTPSm0d1mbEcLxULjJq9Eh.jpg", "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg", "/liLN69YgoovHVgmlHJ876PKi5Yi.jpg", "/2VK4d3mqqTc7LVZLnLPeRiPaJ71.jpg", "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg", "/wDWwtvkRRlgTiUr6TyLSMX8FCuZ.jpg", "/v7UF7ypAqjsFZFdjksjQ7IUpXdn.jpg", "/cvsXj3I9Q2iyyIo95AecSd1tad7.jpg", "/7yyFEsuaLGTPul5UkHc5BhXnQ0k.jpg",
        ];


        console.log(genress[0].name);

        for (let i = 0; i < 10; i++) {

            m.popularity = m.popularity + 10;
            m.release_date = dates[Math.floor(Math.random() * dates.length)];
            let j = i;
            m.original_title = names[3] + j;
            m.title = m.original_title;
            m.backdrop_path = back[i];
            m.poster_path = front[i];
            let g = [];

            g.push(genress[i % 5].name);


            m.genre = g;


            await Movie.create(m);
        }

        // const movie =
        //     await Movie.create({
        //         adult: adult,
        //         awards: awards,
        //         backdrop_path: backdrop_path,
        //         box_office: box_office,
        //         budget: budget,
        //         cast: cast,
        //         crew: crew,
        //         genre: genre,
        //         keywords: keywords,
        //         original_language: original_language,
        //         original_title: original_title,
        //         overview: overview,
        //         popularity: popularity,
        //         poster_path: poster_path,
        //         release_date: release_date,
        //         title: title,
        //         video: video,
        //         vote_average: vote_average,
        //         vote_count: video_count
        //     });

        console.log("Movie Inserterd");
        // res.status(201).json({ movie: movie._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }

};

module.exports.admin_remove_movie = async (req, res) => {

    const { id } = req.body;
    try {
        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        await movie.remove();
        res.status(200).json({ message: "Movie Removed" });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.admin_update_movie = async (req, res) => {
    const { id } = req.body;
    const {
        adult,
        awards,
        backdrop_path,
        box_office,
        budget,
        cast,
        crew,
        genre,
        keywords,
        original_language,
        original_title,
        overview,
        popularity,
        poster_path,
        release_date,
        title,
        video,
        vote_average,
        vote_count
    } = req.body;

}

module.exports.photo_editor = async (req, res) => {
    const array1 = ["https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg",
        "https://mir-s3-cdn-cf.behance.net/project_modules/disp/575414138935599.622710480e7b1.jpg"
    ];
    const array2 = ["https://m.media-amazon.com/images/M/MV5BMGJjZTk1NTYtM2I4Yi00NjJhLTg5OWEtZDlkZjMzZjMyY2VkXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkUsghyoiNBSReQR2mR5EjUHgBrGB0tKNOcZ45450yeQ&s"
    ];

    Movie.find().then(async (movies) => {
        for (var i = 0; i < movies.length; i++) {
            console.log("====>" + movies[i]._id);
            const resp1 = await Movie.updateOne({ _id: movies[i]._id }, { backdrop_path: array2[i] });
            console.log(resp1);
            const resp2 = await Movie.updateOne({ _id: movies[i]._id }, { poster_path: array1[i] });
            console.log(resp2);
            console.log(i);
        }
    })




    res.status(200).json({ message: "Movie Updated" });

}

