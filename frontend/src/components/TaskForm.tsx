import React, { useState } from "react"; // importa o React e o hook useState para lidar com estado local (neste caso, o título da nova tarefa)

interface TaskFormProps {
  onTaskCreated: () => void; // define o tipo das props esperadas: uma função que será chamada quando uma nova tarefa for criada
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => { // define o componente funcional TaskForm e tipa suas props com TaskFormProps
  const [title, setTitle] = useState(''); // cria o estado local "title" e sua função de atualização "setTitle"; inicia como string vazia

  const handleSubmit = async (e: React.FormEvent) => { // função chamada quando o formulário for enviado
    e.preventDefault(); // previne o comportamento padrão do formulário (recarregar a página)

    if (title.trim() === '') return; // se o campo estiver vazio (após remover espaços), não faz nada

    try {
      const response = await fetch('http://localhost:3001/tasks', { // envia uma requisição HTTP POST para a API
        method: 'POST', // método HTTP usado
        headers: {
          'Content-Type': 'application/json', // informa que o corpo da requisição está em formato JSON
        },
        body: JSON.stringify({ title }), // transforma o objeto { title } em uma string JSON e envia como corpo da requisição
      });

      if (response.ok) { // se a resposta for bem-sucedida (status 200 ou 201)
        setTitle(''); // limpa o campo de texto
        onTaskCreated(); // chama a função recebida via props para atualizar a lista de tarefas
      }
    } catch (error) {
      console.error('Erro ao criar tarefa:', error); // exibe no console se houver erro na requisição
    }
  };

  return (
    <form onSubmit={handleSubmit}> {/* define o formulário e liga o evento de envio à função handleSubmit */}
      <input
        type="text" // campo de entrada do tipo texto
        placeholder="Nova tarefa" // texto que aparece quando o campo está vazio
        value={title} // o valor do input é controlado pelo estado "title"
        onChange={(e) => setTitle(e.target.value)} // atualiza o estado "title" sempre que o usuário digitar algo
      />
      <button type="submit">Adicionar</button> {/* botão que envia o formulário */}
    </form>
  );
};

export default TaskForm; // exporta o componente para ser usado em outros arquivos
