import React, { useState, useEffect } from 'react'
import "./ListaDeTarefas.css"

import firebase from './firebaseConfig'
import 'firebase/firestore';
import Navbar from './Navbar';
const db = firebase.firestore();

import TaskAPI from './daoTask';

let userId = null;

function ListaDeTarefas() {
    //let userId = 'unkn'

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            userId = user.uid

        } else {
            window.location.href = "/cadastro"
        }
    })

    const [tarefas, setTarefas] = useState([]);
    const [novaTarefa, setNovaTarefa] = useState('');
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    useEffect(() => {

        const fetchTasks = async () => {
        try {
            const tasksFromAPI = await TaskAPI.readTasks(userId);
            setTarefas(tasksFromAPI);
        } catch (error) {
            console.error('Erro ao buscar tarefas:', error);
        }
        };

        fetchTasks();
    }, [tarefas]);

    const adicionarTarefa = async ({ descricao }, userId) => {
        try {
          const ref = db.collection('tarefas').doc(userId);
          await ref.set({ descricao });
          const taskId = ref.id;
          return taskId;
        } catch (error) {
          console.error('Erro ao criar tarefa:', error);
          throw error;
        }
      };
     
      

    const removerTarefa = async (taskId,userId) => {
            try {
              await db.collection('tarefas').doc(userId).delete();
            } catch (error) {
              console.error('Erro ao excluir tarefa:', error);
              throw error;
            }
          };

    return (
        <div className="lista-de-tarefas">
            <h1>Tarefas Etec</h1>
            <Navbar />
            {mostrarFormulario && (
                <div className="adicionar-tarefa">
                    <input
                        type="text"
                        value={novaTarefa}
                        onChange={(e) => setNovaTarefa(e.target.value)}
                        placeholder="Digite uma nova tarefa"
                    />
                    <button onClick={adicionarTarefa}>Adicionar</button>
                </div>
            )}
            {!mostrarFormulario && (
                <button className="botao-flutuante" onClick={() => setMostrarFormulario(true)}>+</button>
            )}
            <ul>
                {tarefas.map(task => (
                    <li key={task.id} className="tarefa">
                        <div>{task.descricao}</div>
                        <div className="remover-tarefa" onClick={() => removerTarefa(task.id,userId)}>Excluir</div>
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default ListaDeTarefas