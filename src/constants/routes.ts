const API_URL = import.meta.env.API_URL || 'http://localhost:3000';

const URLs = {
    pages: {
        dashboard: '/',
        wishPage: '/wish'
    }, 
    api: {
        wishes: `${API_URL}/wishes`
    }
}

export default URLs;