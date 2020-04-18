import development from './development';
import production from './production';

const env = {
    development,
    production
};


export default env[process.env.NODE_ENV || 'development'];