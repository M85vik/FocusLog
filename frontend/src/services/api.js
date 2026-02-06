import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL 

console.log(BASE_URL, "Base URL");


const API = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})


export const getTimestamps = async () => {
    try {

        const res = await API.get("");
        return res.data;


    } catch (error) {

        console.error("error from getTimestamps frontend : ", error)

    }
}



export const createTimestamp = async (title) => {
    try {

        const res = await API.post("", { title });
        return res.data;


    } catch (error) {

        console.error("error from createTimestamp frontend : ", error)

    }
}


// Start new session
export const startSession = async (id) => {
    try {
        const res = await API.post(`${id}/start`);
        return res.data;
    } catch (error) {

        console.error("error from starSession frontend : ", error)

    }
};


// Stop session
export const stopSession = async (timeseriesId) => {
    try {
        const res = await API.put(`timeseries/${timeseriesId}/stop`);
        return res.data;
    } catch (error) {

           console.error("error from stopSession frontend : ", error)

    }
};

// Delete timestamp
export const deleteTimestamp = async (id) => {
    try {
        const res = await API.delete(`${id}`);
        return res.data;
    } catch (error) {

           console.error("error from deleteTimestamp frontend : ", error)

    }
};
