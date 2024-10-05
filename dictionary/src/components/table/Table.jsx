import Button from "../button/Button"
import data from "../../data"

export default function DictionaryTable() {
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
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.english}</td>
                        <td>{item.transcription}</td>
                        <td>{item.russian}</td>
                        <td>
                            <Button name="Изменить" />
                            <Button name="Удалить" />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
