import useAuth from "../hooks/useAuth"
import useLikedMovies from "../hooks/useLikedMovies"

function UserProfile(){
    const {user} = useAuth()!
    const {data:likedMovies,status:likedStatus} = useLikedMovies()
    return(
        <div>
            <div><h1>Profile</h1></div>
            <div><h2>Username : </h2><h2>user.username</h2></div>
            <div>
                <h2>Liked Movies</h2>
            </div>
        </div>
    )
}

export default UserProfile