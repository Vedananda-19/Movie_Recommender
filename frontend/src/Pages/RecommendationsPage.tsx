import {useQuery} from "@tanstack/react-query"
import api from "../apis/api";
import MovieRow from "../Components/MovieRow";

function RecommendationsPage() {
    const {data:rcmdMovies , isLoading , isFetching, refetch} = useQuery({
        queryKey:["recommendedMovies"],
        queryFn:async()=>{
            try{
                const response = await api.get("/user/recommended-movies")
                return response.data
            }
            catch(error){
                console.log(error)
            }
        }
    })
    if(rcmdMovies?.length===0) return (
        <div className="themeBackground recommendationsPage">
            <div className="recommendationsEmpty">
                <h1>No recommendations yet</h1>
                <p>Like or watch some movies to help us find your next favorite.</p>
            </div>
        </div>
    )

    return (
        <div className="themeBackground recommendationsPage">
            <section className="movieSection">
                <div className="recommendationsHeader">
                    <div>
                        <h1>Recommendations</h1>
                        <p>Movies selected from your likes and watch history.</p>
                    </div>
                    <button className="refreshBtn" onClick={() => {refetch()}}>
                        Refresh Recommendations
                    </button>
                </div>
                {isFetching ? 
                <div className="recommendationsLoading">
                    <p>Refreshing recommendations...</p>
                    <MovieRow isLoading={true} layout="grid" />
                </div>
                 : 
                <MovieRow
                    movies={rcmdMovies ?? []}
                    isLoading={isLoading}
                    layout="grid"
                />}
            </section>
        </div>
    );
}

export default RecommendationsPage;
