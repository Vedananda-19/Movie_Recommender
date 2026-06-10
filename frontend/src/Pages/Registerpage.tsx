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
            const response = await api.get(
                "/auth/get-users",
            );
            setUsersList(response.data);
            console.log(response.data);
            setIsLoading(false);
            setErrorMsg("")
        } catch (error) {
            console.log("An Error Occured");
            setErrorMsg("An Error Occured")
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
        const cp = formData.confirmPassword;
        const p = formData.password;
        if (cp && cp.length === p.length && cp !== p)
            setErrorMsg("Passwords do not Match");
        else setErrorMsg("");
    }, [formData["password"], formData["confirmPassword"]]);

    async function handleRegister(e: React.SubmitEvent) {
        e.preventDefault();
        try {
            const response = await api.post(
                `/auth/register`,
                formData,
            );
            console.log(response.data);
            setErrorMsg("")
        } catch (error) {
            console.log(error);
            setErrorMsg("An Error Occured")
        }
    }
    return (
        <div className="backgroundDiv">
            <div className="centerCard">
                <form className="authForm" onSubmit={(e) => handleRegister(e)}>
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
