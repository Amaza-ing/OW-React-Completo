import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TaskCard from "../components/TaskCard";
import { initialTasks } from "../data/tasks";
import type { RootStackParamList } from "../navigation/types";

type TasksScreenProps = NativeStackScreenProps<RootStackParamList, "Tasks">;

function TasksScreen({ navigation }: TasksScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.screen,
        {
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.eyebrow}>TaskFlow Mobile</Text>
        <Text style={styles.title}>Tareas del equipo</Text>
        <Text style={styles.subtitle}>
          {Platform.select({
            ios: "Interfaz adaptada a iOS",
            android: "Interfaz adaptada a Android",
            default: "Interfaz móvil de TaskFlow",
          })}
        </Text>
      </View>

      <FlatList
        data={initialTasks}
        keyExtractor={(task) => task.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPress={(taskId) => {
              navigation.navigate("TaskDetail", {
                taskId,
              });
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 22,
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

export default TasksScreen;
