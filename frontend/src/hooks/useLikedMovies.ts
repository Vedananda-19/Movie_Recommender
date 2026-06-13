import api from "../apis/api";
import { useQuery } from "@tanstack/react-query";

export default function useLikedMovies(){
    return useQuery({
        queryKey:["likedMovies"],
        queryFn:async() => {
            const response = await api.get("/user/liked-movies")
            return response.data
        }
    })
}