import React, {useState} from 'react';
import './Report.scss'

function Report({image, headline, content, source, url}) {



    return (
        <article className="report-card" >
            <a className="report" href={url} target="_blank">
                <span className="report-image-wrapper">
                    <img className="report-image"
                     src={image}
                     alt="preview-image"/>
            </span>
                <span className="report-content">
                    <header className="report-content-header">
                        <p className="report-content-header-text">{headline}</p>
                    </header>
                    <div className="report-content-summary">
                        <p className="report-content-summary-text">{content}</p>
                    </div>
                    <footer className="report-content-footer">
                        <p>{source}</p>
                    </footer>
                </span>
            </a>
        </article>
    )
}

export default Report;