import useAuth from "../hooks/useAuth"
import api from "../apis/api"
import useRedirectUnauth from "../hooks/useRedirectUnauth"

function MoviesPage (){
    const {check_auth} = useAuth()!
    const redirect = useRedirectUnauth()
    const handleSubmit = async () => {
        const isAuth = await check_auth()
        if(!isAuth){
            redirect()
            return
        }
        try{
            const response = await api.get("/")
            console.log(response.data)
        }
        catch(error){
            console.log(error)
        }
    }

    return(
       <div>
            <div><h1>Movies</h1></div>
            <div className="moviesGrid">
                <button onClick={() => {handleSubmit()}}>Check Protected route</button>
            </div>
        </div>

    )
}

export default MoviesPage