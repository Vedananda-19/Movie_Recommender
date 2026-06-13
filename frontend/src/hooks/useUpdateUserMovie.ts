import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../apis/api";

export default function useUpdateUserMovie(){
    const queryClient = useQueryClient()

    async function updateMovie(movie_id:number,func:string) {
        try {
            await api.get(`/user/${func}-movie/${movie_id}`);
        } catch (error) {
            console.log(error);
        }
    }

    const {mutateAsync:likeMovie} = useMutation({
        mutationFn: async(movie_id:number) => updateMovie(movie_id,"like"),
        onSuccess:() => queryClient.invalidateQueries({queryKey:["likedMovies"]})
    })
    
    const {mutateAsync:watchlistMovie} = useMutation({
        mutationFn : async(movie_id:number) => updateMovie(movie_id,"watchlist"),
        onSuccess : () => queryClient.invalidateQueries({queryKey:["watchlistedMovies"]})
    })

    const {mutateAsync:watchMovie} = useMutation({
        mutationFn : async(movie_id:number) => updateMovie(movie_id,"watch"),
        onSuccess : () =>  queryClient.invalidateQueries({queryKey:["watchedMovies"]})
    })

    return {likeMovie,watchlistMovie,watchMovie}
}