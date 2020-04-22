import React, {useEffect, useState} from 'react';
import './Reports.scss'
import { ReactTinyLink } from 'react-tiny-link';
import config from '../../config';
const Loader = require('react-loader');

function Reports({serverup}) {
    const [newsLinks, setNewsLinks] = useState([]);
    const [reportsPage, setReportsPage] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (serverup) {
            getNewArticles()
        }
    }, [serverup])

    const handleClick = () => {
        setLoading(true);
        getNewArticles()
            .then(() => setLoading(false))
    }

    const getNewArticles = (links = newsLinks) => {
        return fetch(`${config.apiUrl}/api/news?skip=${reportsPage}`)
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
            <div className="load-more" onClick={handleClick}>

                {loading ? <Loader color='white' /> : 'Load more'}
            </div>
        </div>
    );
}

export default Reports;