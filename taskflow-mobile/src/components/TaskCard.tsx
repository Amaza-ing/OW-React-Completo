import { Pressable, StyleSheet, Text, View } from "react-native";
import { taskStatusLabels, type Task } from "../model/task";

type TaskCardProps = {
  task: Task;
  onPress: (taskId: string) => void;
};

function TaskCard({ task, onPress }: TaskCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Abrir ${task.title}`}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => onPress(task.id)}
    >
      <View style={styles.content}>
        <Text style={styles.project}>{task.project}</Text>
        <Text style={styles.title}>{task.title}</Text>
      </View>

      <Text
        style={[
          styles.status,
          task.status === "DOING" && styles.statusDoing,
          task.status === "DONE" && styles.statusDone,
        ]}
      >
        {taskStatusLabels[task.status]}
      </Text>
    </Pressable>
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
  cardPressed: {
    opacity: 0.7,
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
});

export default TaskCard;
