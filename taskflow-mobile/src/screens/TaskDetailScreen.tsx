import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { initialTasks } from "../data/tasks";
import { taskStatusLabels } from "../model/task";
import type { RootStackParamList } from "../navigation/types";

type TaskDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "TaskDetail"
>;

function TaskDetailScreen({ route }: TaskDetailScreenProps) {
  const insets = useSafeAreaInsets();

  const task = initialTasks.find((item) => item.id === route.params.taskId);

  if (task === undefined) {
    return (
      <View style={styles.message}>
        <Text style={styles.messageTitle}>Tarea no encontrada</Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.screen,
        {
          paddingBottom: insets.bottom + 20,
        },
      ]}
    >
      <Text style={styles.eyebrow}>{task.project}</Text>

      <Text style={styles.title}>{task.title}</Text>

      <View style={styles.detailCard}>
        <Text style={styles.label}>Estado</Text>
        <Text style={styles.value}>{taskStatusLabels[task.status]}</Text>
      </View>

      <Text style={styles.note}>
        Esta pantalla recibe únicamente el identificador de la tarea mediante la
        navegación tipada.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    backgroundColor: "#f8fafc",
  },
  eyebrow: {
    color: "#2563eb",
    fontSize: 13,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  title: {
    marginTop: 6,
    color: "#172033",
    fontSize: 28,
    fontWeight: "900",
  },
  detailCard: {
    gap: 5,
    marginTop: 22,
    padding: 16,
    backgroundColor: "#ffffff",
    borderColor: "#dbe3ee",
    borderRadius: 14,
    borderWidth: 1,
  },
  label: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: "700",
  },
  value: {
    color: "#172033",
    fontSize: 18,
    fontWeight: "800",
  },
  note: {
    marginTop: 18,
    color: "#64748b",
    fontSize: 14,
    lineHeight: 21,
  },
  message: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8fafc",
  },
  messageTitle: {
    color: "#172033",
    fontSize: 20,
    fontWeight: "900",
  },
});

export default TaskDetailScreen;
