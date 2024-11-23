
import { useEffect, useState } from "react" // импортируем хук
import Button from "../button/Button" // импортируем кнопку
// import data from "../../data" //импортируем массив слов
import "./Table.css"
import AddWord from "../addWord/AddWord";
import SaveButton from "../button/SaveButton";
import { observer } from "mobx-react-lite";
import { useStores } from "../stores/RootStoreContext"; // хук для доступа к store


export const DictionaryTable = observer(() => {
    const { tableStore } = useStores(); // получили tableStore из контекста
    const [editIndex, setEditIndex] = useState(null);
    const [formData, setFormData] = useState({ english: '', transcription: '', russian: '' });
    const [errors, setErrors] = useState({ english: false, transcription: false, russian: false });

    useEffect(() => {
        // получили слова при монтировании компонента
        tableStore.getWords();
    }, [tableStore]);


    const handleEdit = (index) => {
        const wordToUpdate = tableStore.words[index];
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
        setFormData({ english: '', transcription: '', russian: '' });
    };

    const handleSave = async (index) => {
        await tableStore.editWord(index, formData); // editWords from store
        setEditIndex(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: !value });// Проверяем, пустое ли поле
    };

    const handleDelete = async (index) => {
        await tableStore.deleteWord(index); // deleteWord from store
    };

    const isFormValid = () => {
        return Object.values(formData).every(value => value.trim() !== '');
    };

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
                    {tableStore.map((word, index) => (
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
                                        <SaveButton name="Сохранить" onClick={() => handleSave(index)} disabled={!isFormValid()} />
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
});
