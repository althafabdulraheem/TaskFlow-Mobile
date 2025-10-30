import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { updateTask, deleteTask } from '../api/taskApi';

export default function EditTaskScreen({ route, navigation }) {
  const { task } = route.params;
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleUpdate = async () => {
    await updateTask(task.id, { title, description });
    navigation.goBack();
  };

  const handleDelete = async () => {
    await deleteTask(task.id);
    navigation.goBack();
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <Button title="Save" onPress={handleUpdate} />
      <Button title="Delete" onPress={handleDelete} color="red" />
    </View>
  );
}
