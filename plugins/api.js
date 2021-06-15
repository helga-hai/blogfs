export default function ({ $axios }, inject) {
    // Create a custom axios instance
    const axios = $axios.create({
        headers: {
            common: {
                Accept: 'text/plain, */*'
            }
        }
    })

    axios.setBaseURL(process.env.BASE_URL + 'wp-json/wp/v2/');

    const api = {
        get(url) {
            return axios.get(url);
        }
    }

    // Set baseURL to something different
    

    // Inject to context as $api
    inject('api', api)
}