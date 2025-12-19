const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const URLs = {
    pages: {
        dashboard: '/',
        wishPage: '/wishes/:id'
    }, 
    api: {
        wishes: `${API_URL}/wishes`
    }
}

export default URLs;