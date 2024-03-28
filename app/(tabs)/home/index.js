import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import axios from "axios";

const Index = () => {
  const [task, setTask] = useState("");
  const [taskArr, setTaskArr] = useState([]);
  const [update, setUpdate] = useState("");
  const router = useRouter();

  useEffect(() => {
    getData();
  }, [taskArr]);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      return token;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getHeaders = async () => {
    const token = await getToken();
    if (token) {
      return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
    } else {
      return {
        "Content-Type": "application/json",
      };
    }
  };

  const postData = async (newData) => {
    try {
      const headers = await getHeaders();
      const response = await axios.post(
        "http://192.168.150.81:3000/api/user/create",
        { task: newData },
        { headers }
      );
      if (response) {
        setTaskArr([...taskArr, response.data.obj]);
        setTask("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const headers = await getHeaders();
      const response = await axios.get(
        "http://192.168.150.81:3000/api/user/all",
        { headers }
      );
      if (response) {
        setTaskArr([...response.data.todoArr]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTask = async (index) => {
    try {
      const headers = await getHeaders();
      const response = await axios.post(
        "http://192.168.150.81:3000/api/user/remove",
        { id: index },
        { headers }
      );
      if (response) {
        setTaskArr([...response.data.todoArr]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async (index, task) => {
    try {
      const headers = await getHeaders();
      const response = await axios.post(
        "http://192.168.150.81:3000/api/user/update",
        { id: index, task },
        { headers }
      );
      if (response) {
        setTaskArr([...response.data.todoArr]);
        setUpdate("");
        setTask("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTask = () => {
    if (task.trim() !== "") {
      const taskIndex = update;
      if (taskIndex !== "") {
        // Task already exists, update it
        updateData(update, task);
      } else {
        // Task doesn't exist, add it
        postData(task);
      }
    }
  };

  const handleCheckboxChange = async (index) => {
    try {
      const headers = await getHeaders();
      const editedTask = taskArr.find((item) => item._id == index);
      let completed = !editedTask.completed;
      const response = await axios.post(
        "http://192.168.150.81:3000/api/user/update",
        { id: index, completed },
        { headers }
      );
      if (response) {
        setTaskArr([...response.data.todoArr]);
        setUpdate("");
        setTask("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditTask = (index) => {
    const editedTask = taskArr.find((item) => item._id == index);
    setTask(editedTask.task);
    setUpdate(index);
  };

  const handleLogout = () => {
    AsyncStorage.removeItem("authToken")
      .then(() => {
        console.log("authToken removed successfully");
        router.replace("/login");
      })
      .catch((error) => {
        console.log("Error removing authToken:", error);
      });
  };

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerText}>Hi, Welcome</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={task}
          onChangeText={(text) => setTask(text)}
          style={styles.input}
          placeholder="Add Task"
        />
      </View>
      <View>
        <TouchableOpacity onPress={handleTask} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.taskContainer}>
          {taskArr.map((item) => (
            <View key={item._id} style={styles.taskItem}>
              <CheckBox
                checked={item.completed}
                onPress={() => handleCheckboxChange(item._id)}
                style={{ marginRight: 10 }}
              />
              <Text style={{ flex: 1 }}>{item.task}</Text>
              <Ionicons
                name="pencil-outline"
                size={24}
                color="blue"
                style={{ marginRight: 10 }}
                onPress={() => handleEditTask(item._id)}
              />
              <Ionicons
                name="trash-outline"
                size={24}
                color="red"
                onPress={() => handleDeleteTask(item._id)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#6699CC",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  inputContainer: {
    backgroundColor: "#E0E0E0",
    padding: 5,
    borderRadius: 5,
    margin: 10,
  },
  input: {
    color: "gray",
    marginVertical: 5,
    width: 300,
    fontSize: 17,
  },
  addButton: {
    backgroundColor: "#6699CC",
    padding: 10,
    borderRadius: 6,
    margin: 10,
  },
  addButtonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  taskContainer: {
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
});
