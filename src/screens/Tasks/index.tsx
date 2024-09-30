import { FlatList, StyleSheet, View, Text, Alert } from 'react-native';
import { Task } from '../../components/Task';
import { InputAddTask } from '../../components/InputAddTask';
import { useContext, useEffect, useState } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { TaskProps } from '../../utils/types';
import { Header } from '../../components/Header';
import { useNavigation } from '@react-navigation/native';


export default function Tasks() {

    const { tasks, createTask, setTasks } = useContext(TaskContext);
    const [taskText, setTaskText] = useState("");

    function handleTaskAdd() {
        if (taskText == "") {
            return Alert.alert("Texto vazio. Digite algo!");
        }
        if (tasks.some((task) => task.title === taskText)) {
            return Alert.alert("Essa tarefa já existe!");
        }

        createTask(taskText);
        setTaskText('');
    }

    function handleTaskChangeStatus(taskToChange: TaskProps) {
        const updatedTasks = tasks.filter((task) => task.title !== taskToChange.title)
        const newTask = {
            id: taskToChange.id,
            title: taskToChange.title,
            status: !taskToChange.status,
        }
        updatedTasks.push(newTask);
        setTasks(updatedTasks);
    }

    useEffect(() => {

    }, [tasks]);

    return (
        <View style={styles.container}>

            <Header leftText nameLeftText='< Voltar' rightText nameRightText='Exportar >' />
            <Text style={{ color: '#292827', fontSize: 20, fontWeight: 500, marginBottom: 16 }}>Lista de Tarefas</Text>

            <InputAddTask
                onPress={handleTaskAdd}
                onChangeText={setTaskText}
                value={taskText}
            />

            <View style={styles.tasks}>

                <FlatList
                    data={tasks}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={
                        ({ item }) => (
                            <Task
                                id={item.id}
                                title={item.title}
                                status={item.status}
                                onCheck={() => handleTaskChangeStatus(item)}
                            />
                        )
                    }
                    ListEmptyComponent={() => (
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: '#292827', fontSize: 16, fontWeight: 500 }}>Você ainda não cadastrou tarefas!</Text>
                            <Text style={{ color: '#292827', fontSize: 16, fontWeight: 500 }}>Crie uma tarefa para começar.</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DADADA',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        paddingTop: 50,
        gap: 16,
    },
    tasks: {
        justifyContent: 'flex-start',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
    }
});