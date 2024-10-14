
import { useState } from "react" // импортируем хук
import Button from "../button/Button" // импортируем кнопку
import data from "../../data" //импортируем массив слов


export default function DictionaryTable() {
    const [editIndex, setEditIndex] = useState(null);

    const handleEdit = (index) => {
        console.log("clicked")
        setEditIndex(index);
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
                            </>
                        )}

                    </tr>
                ))}
            </tbody>
        </table>
    );
};