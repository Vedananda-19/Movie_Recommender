import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../apis/api";

export default function(){
    const queryClient = useQueryClient()
    const {mutateAsync:likeMovie} = useMutation({
        mutationFn: like,
        onSuccess:() => { queryClient.invalidateQueries({queryKey:["likedMovies"]})}
    })
    
    async function like(movie_id:number) {
        try {
            await api.get(`/user/like-movie/${movie_id}`);
        } catch (error) {
            console.log(error);
        }
    }
    return likeMovie
}