import axios from 'axios'

const API = axios.create({
    baseURL: `${process.env.REACT_APP_API_DOMAIN_URL}`
})

export const callStoreApi = async (object) => {

    const { method, url, data } = object
    let value;

    if (method.toLowerCase() === 'get') {
        value = await API.get(url)
    }
    else if (method === 'post') {
        value = await API.post(url, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }

    if (value.data.status === 404) {
        return 404
    }

    if (value.data.resource.body.protected) {
        return 401
    }

    return value.data

    /*
    const getApi = async (url) => {
        setIsLoading(true)
        const res = await callStoreApi({
            url,
            method: 'GET'
        })

        if (res === 401) {
            navigate(`/${lang}/users/login/`)
        } else if (res === 401) {
            navigate(`/${lang}/404/`)
        }

        setDataPage(res.resource)
        setDataCall(res.data_call)
    }
    */


}

export default API