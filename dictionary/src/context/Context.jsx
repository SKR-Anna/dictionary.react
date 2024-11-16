import { createContext, useState, useEffect } from "react";

export const CardContext = createContext();

export const CardProvider = ({ children }) => {
    const [cardss, setCards] = useState([]);
    // const [loading, setLoading] = useState(true)
    // const [error, setError] = useState(null)

    const addCard = (card) =>
        setCards((prevCards) => [...prevCards, card]);

    // const removeCard = (number) =>
    //     setCards((prevCards) => prevCards.filter((card) => card.number !== number))
    const removeCard = async (id) => {
        try {
            const response = await fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Ошибка при удалении слова')
            }
            setCards((prevCards) => prevCards.filter((card) => card.id !== id));
        } catch (error) {
            console.error('Ошибка при удалении слова', error);
        }
    };

    useEffect(() => {
        fetch('http://itgirlschool.justmakeit.ru/api/words')
            .then(response => {
                if (response.ok) { //Проверяем, что код ответа 200
                    return response.json();
                } else {
                    throw new Error('Ошибка');
                }
            })
            .then((data) => {
                setCards(data)
                // setLoading(false)
            })
            // .catch(error => setError(error));
            .catch((error) => {
                console.error('error data', error)
            })
    }, []);

    return (
        <CardContext.Provider value={{ cardss, addCard, removeCard }}>{children}</CardContext.Provider>
    );
}