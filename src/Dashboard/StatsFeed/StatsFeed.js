import "./StatsFeed.scss";

import React from 'react';

function StatsFeed() {
    return (
        <article className="stats">
            <header className="stats-feed-header">
                <span className="feed-title">
                    <span className="feed-title-top">World Wide</span>
                    <span className="feed-title-bottom">Coronavirus</span>
                </span>
                    <span className="feed-read">Read</span>
            </header>
        </article>
    );
}

export default StatsFeed;