import React, {useEffect, useState} from 'react';
import './Reports.scss'
import config from '../../config';
import Report from "./Report/Report";
const Loader = require('react-loader');

function Reports({serverup}) {
    const [newsList, setNewsList] = useState([]);
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

    const getNewArticles = (articlesList = newsList) => {
        return fetch(`${config.apiUrl}/api/news?skip=${reportsPage}`)
            .then(res => res.json())
            .then(result => {
                result.forEach( article => {
                    articlesList.push(article)
                })
                return articlesList
            })
            .then(articles => {
                setNewsList(articles)
                setReportsPage(reportsPage + 1)
            })
            .catch(() => console.log({message: 'error getting news'}))


    }

    const removeBadTags = (str) => {
        return str
            .replace(/<ul>/g, '')
            .replace(/<\/ul>/g, '')
            .replace(/<li>/g, '')
            .replace(/<\/li>/g, '')
    }

    return (
        <div className="reports-wrapper">
            <div className="reports-title">Latest News</div>
            <div className="reports-feed">
                {newsList.map((story, index) => (
                    <div className="report-wrapper" key={index}>
                            <Report
                                url={story.url}
                                image={story.urlToImage}
                                headline={story.title}
                                content={removeBadTags(story.description)}
                                source={story.source.name}

                            />
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