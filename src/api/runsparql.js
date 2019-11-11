import axios from 'axios'

export default {
    runSparql (query) {
        return axios({
            url: 'sparql?query=' + query,
            method: 'get',
            baseURL: 'http://ja.dbpedia.org/'
        })
    }
}
