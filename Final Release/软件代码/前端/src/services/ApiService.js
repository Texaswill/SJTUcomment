class ApiService {
    static fetchData(url) {
        return fetch(url)
            .then(res => res.json())
            .catch(error => console.error(error));
    }
}

export default ApiService;
