import React, { useEffect, useState,useContext } from 'react';
import { View, FlatList, Button, RefreshControl,StyleSheet,TouchableOpacity,Text } from 'react-native';
import { fetchTasks, toggleComplete, deleteTask } from '../api/taskApi';
import TaskItem from '../components/TaskItem';
import { AuthContext } from '../context/AuthContext';

export default function TaskListScreen({ navigation }) {
  const { logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  useEffect(() => {
     console.log(tasks)
    const unsubscribe = navigation.addListener('focus', loadTasks);
    return unsubscribe;
   
  }, [navigation]);

  const handleToggle = async (id, completed) => {
    await toggleComplete(id, !completed);
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
    <View style={styles.container}>
      <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
      <Button title="Add Task" onPress={() => navigation.navigate('AddTask')} />
      <FlatList
        data={tasks.data}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadTasks} />}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={() => handleToggle(item.id, item.completed)}
            onDelete={() => handleDelete(item.id)}
            onPress={() => navigation.navigate('EditTask', { task: item })}
          />
        )}
      />
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end', 
    margin: 10,
  },
  logoutBtn: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
