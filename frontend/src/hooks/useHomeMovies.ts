import api from "../apis/api";
import { useQuery } from "@tanstack/react-query";

export default function useHomeMovies(){
    return useQuery({
        queryKey : ["homeMovies"],
        queryFn : async() => {
            const response = await api.get("/tmdb/load-movies-page")
            return response.data
        }
    })
}