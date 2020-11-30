import axios from 'axios';

export const getAllNotes = () => // получение всех записей
axios.get('http://localhost:8000/notes/all');

export const sendNote = (title, body) => // получение всех записей
axios.post('http://localhost:8000/notes/add',{
    title:title,
    body:body
});

export const deleteNote = (id) => // получение всех записей
axios.delete('http://localhost:8000/notes/'+id);

export const updateNote = (id, title, body) => // получение всех записей
axios.put('http://localhost:8000/notes/'+id,{
    title:title,
    body:body
});