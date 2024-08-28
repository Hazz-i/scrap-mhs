import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const axiosClient: AxiosInstance = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_API_SERVER}/image`,
});

axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	return config;
});

axiosClient.interceptors.response.use(
	(response: AxiosResponse) => {
		return response;
	},
	(error: AxiosError) => {
		if (error.response && error.response.status === 401) {
			return error;
		}
		throw error;
	}
);

export default axiosClient;
