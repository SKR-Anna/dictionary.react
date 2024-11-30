import { createContext, useState, useEffect } from "react";

export const CardContext = createContext({
    cardss: [],
    loading: true,
    error: null,
    newWord: {
        id: "",
        english: "",
        transcription: "",
        russian: "",
        tags: " "
    }
});

export const CardProvider = ({ children }) => {
    const [cardss, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [newWord, setNewWord] = useState({
        id: "",
        english: "",
        transcription: "",
        russian: "",
        tags: " "
    });

    useEffect(() => {
        const fetchWords = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/words');
                if (!response.ok) {
                    throw new Error('Не удалось загрузить слова с сервера')
                }
                const data = await response.json();
                console.log('Данные получены:', data);
                setCards(data);
            }
            catch (error) {
                console.error('Ошибка при загрузке:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchWords();
    }, []);

    const addCard = async (card) => {
        try {
            const response = await fetch('/api/words/add', {
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
            const response = await fetch(`/api/words/${id}/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCard),// Отправляем обновленные данные в формате JSON
            });
            if (!response.ok) {
                throw new Error('Ошибка при обновлении слова');
            }
            const updatedCardData = await response.json();// Получаем обновленное слово из ответа
            setCards((prevCards) => prevCards.map((card) => card.id === id ? updatedCardData : card)); // Обновляем состояние
        } catch (error) {
            console.error('Ошибка при обновлении слова:', error);
        }
    };

    const removeCard = async (id) => {
        try {
            const response = await fetch(`/api/words/${id}/delete`, {
                method: 'POST',
            });
            if (!response.ok) {
                throw new Error('Ошибка при удалении слова')
            }
            setCards((prevCards) => prevCards.filter((card) => card.id !== id));
        } catch (error) {
            console.error('Ошибка при удалении слова', error);
        }
    };

    return (
        <CardContext.Provider value={{ cardss, loading, error, newWord, setNewWord, setCards, addCard, removeCard, updateCard }}>{children}</CardContext.Provider>
    );
}