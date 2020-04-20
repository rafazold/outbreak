import config from '../config';
import moment from 'moment';

const hoursFromLastUpdate = (infoType) => {
    const now = moment();
    return fetch(`${config.apiUrl}/api/${infoType}/lastupdate`)
        .then(res => res.json())
        .then(latest => now.diff(moment(latest), 'hours'))
        .catch(error => console.warn(error));
}

export default hoursFromLastUpdate;