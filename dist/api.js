import axios from "axios";
import { load } from "cheerio";
const domain = "https://w11.tenseishitaraslimedattaken-manga.com";
async function getChapters() {
    let res = await axios.get(domain);
    let $ = load(res.data);
    let chapters = [];
    $("div.widget-content ul").children().each((i, el) => {
        let anchor = el.children[el.children.length - 1];
        // @ts-ignore
        let href = anchor.attribs.href;
        // @ts-ignore
        let text = anchor.children[0].data;
        let regex = /[^0-9.]/g;
        let num = Number(text.replace(regex, ""));
        chapters.push({
            url: href,
            number: num
        });
    });
    return chapters.reverse();
}
;
async function getPages(num) {
    let chapters = await getChapters();
    let url = chapters.find(ch => ch.number === num).url;
    let res = await axios.get(url);
    let $ = load(res.data);
    let pages = [];
    $("div#page img").each((i, el) => {
        let src = el.attribs.src;
        pages.push(src);
    });
    return pages;
}
;
const API = {
    getChapters,
    getPages
};
export default API;
