import React, {useEffect, useState} from 'react';
import './Reports.scss'
import { ReactTinyLink } from 'react-tiny-link';
import config from '../../config';
import LazyLoad from 'react-lazyload';


function Reports({serverup}) {
    const [newsLinks, setNewsLinks] = useState([]);
    const [reportsPage, setReportsPage] = useState(0);

    useEffect(() => {
        if (serverup)
            console.log(3)
        getNewArticles()
    }, [serverup])

    const handleClick = () => {
        getNewArticles()
    }

    const getNewArticles = (links = newsLinks) => {
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
                    <div className="report-wrapper" key={index}>
                        <article className={`report`}>
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