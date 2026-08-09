import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";
import TaskCard from "./src/components/TaskCard";
import { initialTasks } from "./src/data/tasks";

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (taskId: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== taskId) {
          return task;
        }

        return {
          ...task,
          status: task.status === "DONE" ? "TODO" : "DONE",
        };
      }),
    );
  };

  const completedTasks = tasks.filter((task) => task.status === "DONE").length;

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Text style={styles.eyebrow}>TaskFlow Mobile</Text>
        <Text style={styles.title}>Tareas del equipo</Text>
        <Text style={styles.subtitle}>
          {completedTasks} de {tasks.length} completadas
        </Text>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(task) => task.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TaskCard task={item} onToggle={toggleTask} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 56,
    backgroundColor: "#f8fafc",
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  eyebrow: {
    color: "#2563eb",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  title: {
    marginTop: 4,
    color: "#172033",
    fontSize: 30,
    fontWeight: "900",
  },
  subtitle: {
    marginTop: 5,
    color: "#64748b",
    fontSize: 15,
  },
  list: {
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
});
