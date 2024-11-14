
import { useState } from "react" // импортируем хук
import Button from "../button/Button" // импортируем кнопку
import data from "../../data" //импортируем массив слов
import "./Table.css"


export default function DictionaryTable() {
    const [editIndex, setEditIndex] = useState(null);
    const [formData, setFormData] = useState({ english: '', transcription: '', russian: '' });
    const [errors, setErrors] = useState({ english: false, transcription: false, russian: false });

    const handleEdit = (index) => {
        // console.log("clicked")
        setEditIndex(index);
        setFormData({
            english: data[index].english,
            transcription: data[index].transcription,
            russian: data[index].russian
        });
    };

    const handleCancel = () => {
        setEditIndex(null);
    };

    const handleSave = (index) => {
        // Здесь должна быть логика для сохранения изменений
        // Например, можно использовать API или обновлять локальный массив данных
        console.log(`Saving changes for word ${index}`);
        setEditIndex(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: !value });// Проверяем, пустое ли поле
    };

    const isFormValid = () => {
        return Object.values(formData).every(value => value.trim() !== '');
    };

    return (
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
                                    <Button name="Сохранить" onClick={() => handleSave(index)} disabled={!isFormValid()} />
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
                            </>
                        )}

                    </tr>
                ))}
            </tbody>
        </table>
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