import { useEffect, useState } from "react";
import InputData from "../entities/InputData";
import ColumnSchema from "../entities/ColumnSchema";

const useData = () => {
    const [inputData, setData] = useState<InputData[]>([]);
    const [columns, setColumns] = useState<ColumnSchema[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    useEffect(() => {
        setIsLoading(true);
        fetch("/api/getData")
            .then((res) => res.text())
            .then((data) => {
                setIsLoading(false);
                const inputData = JSON.parse(data);
                setData(inputData.data);
                setColumns(inputData.columnSchema);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err.message);
            });
    }, []);

    return { inputData, columns, isLoading, error, setData };
}

export default useData;