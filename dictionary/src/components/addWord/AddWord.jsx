import { useState, useContext } from "react"
import SaveButton from "../button/SaveButton";
import { CardContext } from "../../context/Context";

const AddWord = () => {
    const { addCard } = useContext(CardContext);

    const [formData, setFormData] = useState({
        english: '',
        transcription: '',
        russian: ''
    });

    const isFormValid =
        formData.english.trim() !== '' &&
        formData.transcription.trim() !== '' &&
        formData.russian.trim() !== '';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addCard({
            id: Date.now().toString(),
            ...formData,
            tags: ' '
        });
        setFormData({
            english: '',
            transcription: '',
            russian: ''
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="english"
                placeholder="Слово"
                value={formData.english}
                onChange={handleChange}
            />
            <input
                type="text"
                name="transcription"
                placeholder="Транскрипция"
                value={formData.transcription}
                onChange={handleChange}
            />
            <input
                type="text"
                name="russian"
                placeholder="Перевод"
                value={formData.value}
                onChange={handleChange}
            />
            <SaveButton
                name="Добавить слово"
                disabled={!isFormValid}
                type="submit"
            />
        </form>
    )
}

export default AddWord
