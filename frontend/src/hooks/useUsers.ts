import { useEffect, useState } from "react";
import Users from "../entities/User";

const useUsers = () => {
    const [users, setUsers] = useState<Users>({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setIsLoading(true);
        fetch("/api/getUsers")
            .then((res) => res.text())
            .then((data) => {
                setIsLoading(false);
                const usersData = JSON.parse(data);
                setUsers(usersData);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err.message);
            });
    }, []);

    return { users, isLoading, error };
}

export default useUsers;