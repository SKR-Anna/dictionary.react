import { makeAutoObservable, runInAction } from 'mobx';


class TableStore {
    // observable
    words = [];
    isLoading = false;

    constructor() {
        makeAutoObservable(this)
    }

    //actions
    // Метод для получения слов из API
    async getWords() {
        try {
            this.isLoading = true;
            const response = await fetch('/api/words');
            if (!response.ok) {
                throw new Error('Ошибка при получении слов');
            }
            const data = await response.json(); // получили в ответ данные с api

            runInAction(() => {
                this.words = data; // заполнили этими данными массив
                this.isLoading = false;
            }); // используем, чтобы не было лишних перерендериваний компонента
        } catch (error) {
            this.isLoading = false;
            console.error('Ошибка при получении слов:', error);
        }
    }


    // Метод для добавления нового слова
    addWord = async (word) => {
        try {
            this.isLoading = true;
            const response = await fetch(`/api/words/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(word), // преобразую объект word в строку джейсон
            });
            if (!response.ok) {
                throw new Error('Ошибка при добавлении слова');
            }
            const data = await response.json();

            runInAction(() => {
                this.words.push(data);//добавляем новое слово в массив
                this.isLoading = false;
            });
            return data;
        } catch (error) {
            this.isLoading = false;
            console.error('Ошибка при добавлении слова:', error);
        }
    }

    editWord = async (index, newWord) => {
        try {
            this.isLoading = true;
            const wordId = this.words[index].id; // определяем какое слово редактируем по его айди 
            const response = await fetch(`/api/words/${wordId}/edit`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ word: newWord }),
            });
            if (!response.ok) {
                throw new Error('Ошибка при редактировании слова');
            }
            runInAction(() => {
                this.words[index].word = newWord; // обновили массив
                this.isLoading = false;
            })
        } catch (error) {
            this.isLoading = false;
            console.error('Ошибка при редактировании слова:', error)
        }
    }

    deleteWord = async (index) => {
        try {
            this.isLoading = true;
            const wordId = this.words[index].id;
            const response = await fetch(`/api/words/${wordId}/delete`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Ошибка при удалении слова');
            }
            runInAction(() => {
                this.words.splice(index, 1) // удаляем слово из локального массива
                this.isLoading = false;
            })
        } catch (error) {
            this.isLoading = false;
            console.error('Ошибка при удалении слова:', error);
        }
    }
};

export default new TableStore();

    // async gerWords() {
    //     try {
    //     const response = await axios.get('/api/words'); 
    //     this.words = response.data;
    //     } catch (error) {
    //     console.error('Ошибка при получении слов:', error);
    //     }
    //     } можно ещё так писать, с использованием библиотеки для запросов
    // можно ещё использовать библиотеку, чтобы каждый раз флаги не прописывать