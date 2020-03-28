import React, {useState} from 'react';
import './Reports.scss'
import { ReactTinyLink } from 'react-tiny-link';
import LazyLoad from 'react-lazyload';

const links = [
    'https://edition.cnn.com/2020/03/05/asia/coronavirus-covid-19-update-india-intl-hnk/index.html',
    'https://www.npr.org/sections/goatsandsoda/2020/03/05/812570693/how-coronavirus-spreads-a-cough-in-your-face-or-a-kiss-on-your-cheek',
    'https://www.bbc.com/news/world-africa-51752974',
    'https://edition.cnn.com/2020/03/05/asia/coronavirus-covid-19-update-india-intl-hnk/index.html',
    'https://www.npr.org/sections/goatsandsoda/2020/03/05/812570693/how-coronavirus-spreads-a-cough-in-your-face-or-a-kiss-on-your-cheek',
    'https://www.bbc.com/news/world-africa-51752974',
    'https://edition.cnn.com/2020/03/05/asia/coronavirus-covid-19-update-india-intl-hnk/index.html',
    'https://www.npr.org/sections/goatsandsoda/2020/03/05/812570693/how-coronavirus-spreads-a-cough-in-your-face-or-a-kiss-on-your-cheek',
    'https://www.bbc.com/news/world-africa-51752974',
    'https://www.bbc.com/news/world-africa-51752974',
    'https://edition.cnn.com/2020/03/05/asia/coronavirus-covid-19-update-india-intl-hnk/index.html',
    'https://www.npr.org/sections/goatsandsoda/2020/03/05/812570693/how-coronavirus-spreads-a-cough-in-your-face-or-a-kiss-on-your-cheek',
    'https://www.bbc.com/news/world-africa-51752974',
    'https://edition.cnn.com/2020/03/05/asia/coronavirus-covid-19-update-india-intl-hnk/index.html',
    'https://www.npr.org/sections/goatsandsoda/2020/03/05/812570693/how-coronavirus-spreads-a-cough-in-your-face-or-a-kiss-on-your-cheek',
    'https://www.bbc.com/news/world-africa-51752974',
    'https://www.bbc.com/news/world-africa-51752974',
    'https://edition.cnn.com/2020/03/05/asia/coronavirus-covid-19-update-india-intl-hnk/index.html',
    'https://www.npr.org/sections/goatsandsoda/2020/03/05/812570693/how-coronavirus-spreads-a-cough-in-your-face-or-a-kiss-on-your-cheek',
    'https://www.bbc.com/news/world-africa-51752974',
    'https://edition.cnn.com/2020/03/05/asia/coronavirus-covid-19-update-india-intl-hnk/index.html',
    'https://www.npr.org/sections/goatsandsoda/2020/03/05/812570693/how-coronavirus-spreads-a-cough-in-your-face-or-a-kiss-on-your-cheek',
    'https://www.bbc.com/news/world-africa-51752974',
    'https://www.bbc.com/news/uk-51790242',
    'https://www.bbc.com/news/uk-51786936',
    'https://www.bbc.com/news/world-51735367',
]

function Reports() {
    const [hide, setHide] = useState("hidden")
    function showReports() {
        setHide("");
    }

    return (
        <div className="reports-wrapper">
            <div className="reports-feed">
                {links.map((link, index) => (
                    <article className={`report ${index > 11 ? hide : ""}`}>
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