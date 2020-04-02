import React, {useEffect, useState} from 'react';
import './Reports.scss'
import { ReactTinyLink } from 'react-tiny-link';
import LazyLoad from 'react-lazyload';

// const links = [
//     'https://edition.cnn.com/2020/03/05/asia/coronavirus-covid-19-update-india-intl-hnk/index.html',
//     'https://www.npr.org/sections/goatsandsoda/2020/03/05/812570693/how-coronavirus-spreads-a-cough-in-your-face-or-a-kiss-on-your-cheek',
//     'https://www.bbc.com/news/world-africa-51752974',
//     'https://edition.cnn.com/2020/03/05/asia/coronavirus-covid-19-update-india-intl-hnk/index.html',
//     'https://www.npr.org/sections/goatsandsoda/2020/03/05/812570693/how-coronavirus-spreads-a-cough-in-your-face-or-a-kiss-on-your-cheek',
//     'https://www.bbc.com/news/world-africa-51752974',
//     'https://edition.cnn.com/2020/03/05/asia/coronavirus-covid-19-update-india-intl-hnk/index.html',
//     'https://www.npr.org/sections/goatsandsoda/2020/03/05/812570693/how-coronavirus-spreads-a-cough-in-your-face-or-a-kiss-on-your-cheek',
//     'https://www.bbc.com/news/world-africa-51752974',
//     'https://www.bbc.com/news/world-africa-51752974',
//     'https://edition.cnn.com/2020/03/05/asia/coronavirus-covid-19-update-india-intl-hnk/index.html',
//     'https://www.npr.org/sections/goatsandsoda/2020/03/05/812570693/how-coronavirus-spreads-a-cough-in-your-face-or-a-kiss-on-your-cheek',
//     'https://www.bbc.com/news/world-africa-51752974',
//     'https://edition.cnn.com/2020/03/05/asia/coronavirus-covid-19-update-india-intl-hnk/index.html',
//     'https://www.npr.org/sections/goatsandsoda/2020/03/05/812570693/how-coronavirus-spreads-a-cough-in-your-face-or-a-kiss-on-your-cheek',
//     'https://www.bbc.com/news/world-africa-51752974',
//     'https://www.bbc.com/news/world-africa-51752974',
//     'https://edition.cnn.com/2020/03/05/asia/coronavirus-covid-19-update-india-intl-hnk/index.html',
//     'https://www.npr.org/sections/goatsandsoda/2020/03/05/812570693/how-coronavirus-spreads-a-cough-in-your-face-or-a-kiss-on-your-cheek',
//     'https://www.bbc.com/news/world-africa-51752974',
//     'https://edition.cnn.com/2020/03/05/asia/coronavirus-covid-19-update-india-intl-hnk/index.html',
//     'https://www.npr.org/sections/goatsandsoda/2020/03/05/812570693/how-coronavirus-spreads-a-cough-in-your-face-or-a-kiss-on-your-cheek',
//     'https://www.bbc.com/news/world-africa-51752974',
//     'https://www.bbc.com/news/uk-51790242',
//     'https://www.bbc.com/news/uk-51786936',
//     'https://www.bbc.com/news/world-51735367',
// ]

function Reports() {
    const [hide, setHide] = useState("hidden");
    const [newsLinks, setNewsLinks] = useState([]);

    useEffect(() => {
        const LinksArr = [];
        fetch('https://newsapi.org/v2/everything?q=COVID&from=2020-03-31&sortBy=publishedAt&apiKey=65dada377a964d1ea4e91f8241e77c0a&pageSize=20&page=1&language=en')
            .then(res => res.json())
            .then(result => {
                result.articles.forEach(article => {
                    LinksArr.push(article.url)
                })
                return LinksArr
            })
            .then(links => setNewsLinks(links))
            .catch(() => console.log({message: 'error getting news'}))
    }, [])

    function showReports() {
        setHide("");
    }

    return (
        <div className="reports-wrapper">
                <header className="reports-title">Live Reports</header>
            <div className="reports-feed">
                {newsLinks.map((link, index) => (
                    <article className={`report ${index > 3 ? hide : ""}`}>
                        {/*    <LazyLoad*/}
                        {/*    height={100}*/}
                        {/*    placeholder={<span>wait</span>}*/}
                        {/*>*/}
                        <ReactTinyLink
                            cardSize="small"
                            width="30%"
                            showGraphic={true}
                            maxLine={2}
                            minLine={1}
                            url={link}
                        />
                        {/*</LazyLoad>*/}
                    </article>
                ))}
            </div>
            <div className="read-more" onClick={showReports}>Read more</div>
        </div>
    );
}

export default Reports;