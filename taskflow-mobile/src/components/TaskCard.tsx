import { Pressable, StyleSheet, Text, View } from "react-native";
import { taskStatusLabels, type Task } from "../model/task";

type TaskCardProps = {
  task: Task;
  onToggle: (taskId: string) => void;
};

function TaskCard({ task, onToggle }: TaskCardProps) {
  const isDone = task.status === "DONE";

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.project}>{task.project}</Text>

        <Text style={styles.title}>{task.title}</Text>

        <Text
          style={[
            styles.status,
            task.status === "DOING" && styles.statusDoing,
            task.status === "DONE" && styles.statusDone,
          ]}
        >
          {taskStatusLabels[task.status]}
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => onToggle(task.id)}
      >
        <Text style={styles.buttonText}>
          {isDone ? "Reabrir" : "Completar"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 14,
    padding: 16,
    backgroundColor: "#ffffff",
    borderColor: "#dbe3ee",
    borderRadius: 14,
    borderWidth: 1,
  },
  content: {
    gap: 5,
  },
  project: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: "700",
  },
  title: {
    color: "#172033",
    fontSize: 18,
    fontWeight: "800",
  },
  status: {
    alignSelf: "flex-start",
    marginTop: 5,
    paddingHorizontal: 9,
    paddingVertical: 5,
    color: "#334155",
    backgroundColor: "#f1f5f9",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: "800",
  },
  statusDoing: {
    color: "#92400e",
    backgroundColor: "#fef3c7",
  },
  statusDone: {
    color: "#166534",
    backgroundColor: "#dcfce7",
  },
  button: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 9,
    backgroundColor: "#dbeafe",
    borderRadius: 9,
  },
  buttonPressed: {
    opacity: 0.65,
  },
  buttonText: {
    color: "#1e3a8a",
    fontWeight: "800",
  },
});

export default TaskCard;
