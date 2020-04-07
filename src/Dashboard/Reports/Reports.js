import React, {useEffect, useState} from 'react';
import './Reports.scss'
import { ReactTinyLink } from 'react-tiny-link';
import LazyLoad from 'react-lazyload';


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
                <header className="reports-title">Latest News</header>
            <div className="reports-feed">
                {newsLinks.map((link, index) => (
                    <div className="report-wrapper">
                        <article className={`report ${index > 11 ? hide : ""}`}>
                            {/*    <LazyLoad*/}
                            {/*    height={100}*/}
                            {/*    placeholder={<span>wait</span>}*/}
                            {/*>*/}
                            <ReactTinyLink
                                cardSize="small"
                                width="100%"
                                height="100%"
                                showGraphic={true}
                                maxLine={2}
                                minLine={1}
                                url={link}
                            />
                            {/*</LazyLoad>*/}
                        </article>
                    </div>
                ))}
            </div>
            <div className="read-more" onClick={showReports}>Read more</div>
        </div>
    );
}

export default Reports;