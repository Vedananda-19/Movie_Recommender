import api from "../apis/api";
import { useQuery } from "@tanstack/react-query";

export default function useUserMovies(){
    const likedMoviesQuery =  useQuery({
        queryKey:["likedMovies"],
        queryFn:async() => {
            const response = await api.get("/user/liked-movies")
            return response.data
        }
    })
    const watchlistedMoviesQuery = useQuery({
        queryKey : ["watchlistedMovies"],
        queryFn : async() => {
            const response = await api.get("/user/watchlisted-movies")
            return response.data
        }
    })
    const watchedMoviesQuery = useQuery({
        queryKey : ["watchedMovies"],
        queryFn : async() => {
            const response = await api.get("/user/watched-movies")
            return response.data
        }
    })
    return {likedMoviesQuery,watchlistedMoviesQuery,watchedMoviesQuery}
}