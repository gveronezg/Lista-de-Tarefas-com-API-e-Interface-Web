import { useState } from 'react';
import api from '../services/api';  // Importando o serviço de API

interface Props {
    onTaskCreated: () => void; // Callback para notificar quando uma tarefa é criada
}

export function TaskForm({ onTaskCreated }: Props) {
    const [description, setDescription] = useState(''); // Estado para armazenar a descrição da tarefa

    async function handleSubmit(event: React.FormEvent) {

    }
}