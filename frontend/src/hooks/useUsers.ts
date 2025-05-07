import { useEffect, useMemo, useState } from "react";
import Users from "../entities/User";
import UsersDropdown from "../entities/UsersDropdown";

const useUsers = () => {
    const [users, setUsers] = useState<Users>({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [availableUsers, setAvailableUsers] = useState<UsersDropdown[]>([]);

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

    useMemo(() => {
        if (Object.keys(users).length > 0) {
            let availableUsers: UsersDropdown[] = [];
            Object.keys(users).map((uId) => {
                let user = users[uId];
                availableUsers.push({
                    value: uId,
                    label: user.username,
                    imageUrl: user.avatar,
                });
                return availableUsers;
            });
            setAvailableUsers(availableUsers);
        }
    }, [users]);

    return { users, availableUsers, isLoading, error };
}

export default useUsers;