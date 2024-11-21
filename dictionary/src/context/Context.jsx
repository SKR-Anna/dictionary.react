import { createContext, useState, useEffect } from "react";

export const CardContext = createContext();

export const CardProvider = ({ children }) => {
    const [cardss, setCards] = useState([]);
    // const [loading, setLoading] = useState(true)
    // const [error, setError] = useState(null)

    const addCard = async (card) => {
        try {
            const response = await fetch('/api/words', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(card), // Отправляем данные в формате JSON
            });
            if (!response.ok) {
                throw new Error('Ошибка при добавлении слова');
            }
            const newCard = await response.json(); // получаем добавленное слово из ответа
            setCards((prevCards) => [...prevCards, newCard]); //обновляем состояния
        } catch (error) {
            console.error('Ошибка при добавлении слова:', error);
        }
    };

    const updateCard = async (id, updatedCard) => {
        try {
            const response = await fetch(`/api/words/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCard),// Отправляем обновленные данные в формате JSON
            });
            if (!response.ok) {
                throw new Error('Ошибка при обновлении слова');
            }
            return await response.json(); // Возвращаем обновленное слово
            // const newCard = await response.json();// Получаем обновленное слово из ответа
            // setCards((prevCards) => prevCards.map((card) => card.id === id ? newCard : card)); // Обновляем состояние
        } catch (error) {
            console.error('Ошибка при обновлении слова:', error);
        }
    };

    const removeCard = async (id) => {
        try {
            const response = await fetch(`/api/words/${id}`, {
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
        fetch('/api/words')
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
        <CardContext.Provider value={{ cardss, setCards, addCard, removeCard, updateCard }}>{children}</CardContext.Provider>
    );
}