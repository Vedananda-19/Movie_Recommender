import api from "../apis/api";
import { useQueries } from "@tanstack/react-query";

type MovieType = {
    id: number;
    title: string;
    poster_path?: string;
    rating?: number;
    release_date?: string;
};


export default function useMovieDetails(ids?:number[]){
    return useQueries({
        queries:(ids ?? []).map((id) => (
            {queryKey:["movie",id],
                queryFn:async() => {
                    const response = await api.get(`tmdb/movie/${id}`)
                    const data : MovieType = response.data
                    return data
                },staleTime: 1000 * 60 * 30
            })
        )
    })
}