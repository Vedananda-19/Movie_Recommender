import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../apis/api";

function RegisterPage() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        dob: "",
    });
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [usersList, setUsersList] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getUsersList = async () => {
        try {
            const response = await axios.get(`${api}/get-users`);
            setUsersList(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log("An Error Occured");
        }
    };

    useEffect(() => {
        getUsersList();
    }, []);
    useEffect(() => {
        !isLoading && usersList.includes(formData.username)
            ? setErrorMsg("Username Already Exists")
            : setErrorMsg("");
    }, [formData["username"]]);
    useEffect(() => {
        if (formData.password === formData.confirmPassword)
            setErrorMsg("Passwords do not Match");
        else setErrorMsg("");
    }, [formData["password"], formData["confirmPassword"]]);

    function handleRegister() {}
    return (
        <div className="backgroundDiv">
            <div className="centerCard">
                <form className="authForm" onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="username"
                        value={formData["username"]}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                username: e.target.value,
                            })
                        }
                        required
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={formData["password"]}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            })
                        }
                        required
                    />
                    <input
                        type="password"
                        placeholder="confirm password"
                        value={formData["confirmPassword"]}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                confirmPassword: e.target.value,
                            })
                        }
                        required
                    />
                    <input
                        type="date"
                        placeholder="date of birth"
                        value={formData["dob"]}
                        onChange={(e) =>
                            setFormData({ ...formData, dob: e.target.value })
                        }
                        required
                    />
                    <button type="submit">Register</button>
                    {errorMsg && <p>{errorMsg}</p>}
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
