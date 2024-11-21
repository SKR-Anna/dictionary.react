
import { useState, useContext } from "react" // импортируем хук
import Button from "../button/Button" // импортируем кнопку
// import data from "../../data" //импортируем массив слов
import "./Table.css"
import SaveButton from "../button/SaveButton";
import AddWord from "../addWord/AddWord";
import { CardContext } from "../../context/context";


export default function DictionaryTable() {
    const [editIndex, setEditIndex] = useState(null);
    const [formData, setFormData] = useState({ english: '', transcription: '', russian: '' });
    const [errors, setErrors] = useState({ english: false, transcription: false, russian: false });
    const { cardss, setCards, removeCard } = useContext(CardContext);
    const [visibleCount, setVisibleCount] = useState(10); // в честь поломки апи добавляем вот это вместо 1500 слов 

    // const handleEdit = async (index) => {
    //     const wordToUpdate = cardss[index]; // Получаем текущее слово по индексу
    //     const updatedWord = { ...formData }; // Создаем новый объект слова
    //     const newCard = await updateCard(wordToUpdate.id, updatedWord); // Асинхронно обновляем слово через API
    //     return newCard; // Возвращаем обновленное слово
    // };

    const handleEdit = (index) => {
        const wordToUpdate = cardss[index];
        if (!wordToUpdate) {
            console.error(`Ошибка: слово с индексом ${index} не найдено.`);
            return;
        }
        setEditIndex(index);
        setFormData({
            english: wordToUpdate.english || '',
            transcription: wordToUpdate.transcription || '',
            russian: wordToUpdate.russian || '',
        });
    };

    const handleCancel = () => {
        setEditIndex(null);
        setFormData({ english: '', transcription: '', russian: '' }); // Сброс формы
    };

    const handleSave = async (index) => {
        if (!isFormValid) {
            console.error("Форма не валидна. Сохранение невозможно.");
            return;
        }
        const updatedCard = { ...formData }; // Создаем объект с обновленными данными
        const newCard = await updatedCard[index].id;// Обновляем карту через API
        setCards((prevCards) => prevCards.map((card) => (card.id === newCard ? newCard : card)));// Обновляем состояние
        setEditIndex(null); // Сбрасываем индекс редактирования
        console.log(`Saving changes for word ${index}`);
    };

    const handleDelete = async (index) => {
        const wordToDelete = cardss[index];
        await removeCard(wordToDelete.id);
        console.log(`Deleted word at index ${index}`);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value }); // Обновляем состояние формы
        //setErrors({ ...errors, [name]: !value });// Проверяем, пустое ли поле
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: value.trim() === '',
        }));
    };

    // const isFormValid = () => {
    //     Object.values(formData).every(value => value.trim() !== '');
    // };
    const isFormValid = formData.english.trim() !== ''
        && formData.transcription.trim() !== ''
        && formData.russian.trim() !== '';

    return (
        <>
            <>
                <AddWord />
                <SaveButton name="Добавить слово" onClick={() => handleSave()} disabled={!isFormValid} />
            </>
            <table>
                <thead>
                    <tr>
                        <th>Слово</th>
                        <th>Транскрипция</th>
                        <th>Перевод</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {cardss.slice(0, visibleCount).map((word, index) => (
                        <tr key={word.id}>
                            {editIndex === index ? (
                                <>
                                    <td><input
                                        type="text"
                                        name="english"
                                        value={formData.english}
                                        onChange={handleChange}
                                        className={`${errors.english ? 'no-valid' : ''}`} />
                                    </td>
                                    <td><input
                                        type="text"
                                        name="transcription"
                                        value={formData.transcription}
                                        onChange={handleChange}
                                        className={`${errors.transcription ? 'no-valid' : ''}`} />
                                    </td>
                                    <td><input
                                        type="text"
                                        name="russian"
                                        value={formData.russian}
                                        onChange={handleChange}
                                        className={`${errors.russian ? 'no-valid' : ''}`} /></td>
                                    <td>
                                        <SaveButton name="Сохранить" onClick={() => handleSave(index)} disabled={!isFormValid} />
                                        <Button name="Отмена" onClick={handleCancel} />
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{word.english}</td>
                                    <td>{word.transcription}</td>
                                    <td>{word.russian}</td>
                                    <td>
                                        <Button name="Изменить" onClick={() => handleEdit(index)} />
                                        <Button name="Удалить" onClick={() => handleDelete(index)} />
                                    </td>
                                </>
                            )}

                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};


{/* <>
<td><input type="text" defaultValue={word.english} /></td>
<td><input type="text" defaultValue={word.transcription} /></td>
<td><input type="text" defaultValue={word.russian} /></td>
<td>
    <Button name="Сохранить" onClick={() => handleSave(index)} />
    <Button name="Отмена" onClick={handleCancel} />
</td>
</>
) : (
<>
<td>{word.english}</td>
<td>{word.transcription}</td>
<td>{word.russian}</td>
<td>
    <Button name="Изменить" onClick={() => handleEdit(index)} />
    <Button name="Удалить" />
</td>
</> */}