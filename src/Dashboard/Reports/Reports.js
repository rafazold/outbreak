import React, {useEffect, useState} from 'react';
import './Reports.scss'
import { ReactTinyLink } from 'react-tiny-link';
import config from '../../config'
import LazyLoad from 'react-lazyload';


function Reports() {
    const [hide, setHide] = useState("hidden");
    const [newsLinks, setNewsLinks] = useState([]);
    const [reportsPage, setReportsPage] = useState(0);

    useEffect(() => {
        // const LinksArr = [];
        // fetch('https://newsapi.org/v2/everything?q=COVID&from=2020-03-31&sortBy=publishedAt&apiKey=65dada377a964d1ea4e91f8241e77c0a&pageSize=20&page=1&language=en&sources=abc-news,bbc-news,bloomberg,business-insider,cnbc,cnn,financial-post,fox-news,google-news,google-news-au,google-news-ca,google-news-in,google-news-uk,independent,mashable,medical-news-today,msnbc,nbc-news,news24,new-scientist,politico,reuters,the-wall-street-journal,the-washington-post,the-washington-times,time,usa-today')
        //     .then(res => res.json())
        //     .then(result => {
        //         result.articles.forEach(article => {
        //             LinksArr.push(article.url)
        //         })
        //         return LinksArr
        //     })
        //     .then(links => setNewsLinks(links))
        //     .catch(() => console.log({message: 'error getting news'}))
        getNewArticles()
    }, [])

    function showReports() {
        setHide("");
    }
    const handleClick = () => {
        getNewArticles()
    }

    const getNewArticles = () => {
        const links = newsLinks;
        fetch(`${config.apiUrl}/api/news?skip=${reportsPage}`)
            .then(res => res.json())
            .then(result => {
                result.forEach( article => {
                    links.push(article.url)
                })
                return links
            })
            .then(urls => {
                setNewsLinks(urls)
                setReportsPage(reportsPage + 1)
            })
            .catch(() => console.log({message: 'error getting news'}))


    }

    return (
        <div className="reports-wrapper">
            <div className="reports-title">Latest News</div>
            <div className="reports-feed">
                {newsLinks.map((link, index) => (
                    <div className="report-wrapper">
                        <article className={`report ${index > 11 ? "" : ""}`}>
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
            <div className="load-more" onClick={handleClick}>Load more</div>
        </div>
    );
}

export default Reports;