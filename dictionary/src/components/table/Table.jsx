
import { useState } from "react" // импортируем хук
import Button from "../button/Button" // импортируем кнопку
import data from "../../data" //импортируем массив слов
import "./Table.css"
import SaveButton from "../button/SaveButton";
import AddWord from "../addWord/AddWord";


export default function DictionaryTable() {
    const [editIndex, setEditIndex] = useState(null);
    const [formData, setFormData] = useState({ english: '', transcription: '', russian: '' });
    const [errors, setErrors] = useState({ english: false, transcription: false, russian: false });
    const [words, setWords] = useState(data); // храним данные в состоянии, это поможет потом переключться на api, я надеюсь
    //const [currentWord, setCurrentWord] = useState({ english: '', transcription: '', russian: '' }); //состояние для отслеживания текущих значений таблицы, чтобы DictionaryTable сохранял текущее состояние редактируемых полей, а не полагался на defaultValue

    const handleEdit = (index) => {
        // console.log("clicked")
        setEditIndex(index);
        setFormData({
            english: data[index].english,
            transcription: data[index].transcription,
            russian: data[index].russian
        });
        // setCurrentWord(words[index]);
        // console.log(currentWord);
    };

    const handleCancel = () => {
        setEditIndex(null);
        setFormData({ english: '', transcription: '', russian: '' }); // Сброс формы
    };

    const handleSave = (index) => {
        const updatedWord = { ...formData }; // Создаем новый объект слова
        const newWords = words.map((word, i) => (i === index ? updatedWord : word));
        setWords(newWords);
        setEditIndex(null);
        // Здесь должна быть логика для сохранения изменений
        // Например, можно использовать API или обновлять локальный массив данных
        console.log(`Saving changes for word ${index}`);
        setEditIndex(null);
    };

    const handleDelete = (index) => {
        const newData = data.filter((_, i) => i !== index);
        // Задаю обновленное состояние для массива слов, если данные хранятся в state
        console.log(`Deleted word at index ${index}`);
        setWords(newData);// Обновляем состояние
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: !value });// Проверяем, пустое ли поле
        // setCurrentWord((prev) => ({ ...prev, [name]: value }));
    };

    const isFormValid = () => {
        return Object.values(formData).every(value => value.trim() !== '');
    };

    return (
        <>
            <>
                <AddWord />
                <SaveButton name="Добавить слово" onClick={() => handleSave()} disabled={isFormValid ? false : true} />
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
                    {data.map((word, index) => (
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
                                        <SaveButton name="Сохранить" onClick={() => handleSave(index)} disabled={isFormValid ? false : true} />
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