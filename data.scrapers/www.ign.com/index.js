const AXIOS = require("axios");
const CHEERIO = require("cheerio");

const URL = `https://www.ign.com/articles/top-25-best-anime-series-of-all-time`;

const AnimeListItem = {
    name: "",
    imageURL: "",
    description: "",
    rank: "",
}


AXIOS.get(URL).then(({data}) => {

    const $ = CHEERIO.load(data);
    const articlePage = $(".article-page");

    const initializeAnimeItems = (node) => {
        const animeList = [];
        $(node).children("h2").each((i, el) => {
            const element = $(el);
            if (element.text().length !== 0) {
                let animeItem = Object.create(AnimeListItem);

                const rankAndName = splitName(element.text());
                animeItem.name = rankAndName[1];
                animeItem.rank = rankAndName[0];

                const imgElement = $(element.next().children().children().html())
                animeItem.imageURL = imgElement.attr("src");
                animeItem.description = element.next().next().text();
                animeList.push(animeItem);
            }
        });
        return animeList;
    }

    const findSrc = (node) => {
        console.log(node.find("img"))
    }

    const splitName = (str) => {
        return str.split(". ");
    }

    let arr = initializeAnimeItems(articlePage);
    console.log(arr);


}).catch((error) => console.error(error));