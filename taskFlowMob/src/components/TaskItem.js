import React from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';

export default function TaskItem({ task, onToggle, onDelete, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          borderBottomWidth: 1,
        }}
      >
        <Text style={{ textDecorationLine: task.completed ? 'line-through' : 'none' }}>
          {task.title}
        </Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button title={task.completed ? 'Undo' : 'Done'} onPress={onToggle} />
          <Button title="🗑" onPress={onDelete} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
