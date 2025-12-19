const API_URL = import.meta.env.API_URL || 'http://localhost:3000';

const URLs = {
    pages: {
        dashboard: 'demo-wishlist/',
        wishPage: 'demo-wishlist/wishes/:id'
    }, 
    api: {
        wishes: `${API_URL}/wishes`
    }
}

export default URLs;