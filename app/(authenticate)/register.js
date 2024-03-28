import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { MaterialIcons, Ionicons, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    axios
      .post("http://192.168.150.81:3000/api/auth/signup", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration successful",
          "You have been registered successfully"
        );
        setEmail("");
        setPassword("");
        setName("");
      })
      .catch((error) => {
        Alert.alert("Registration failed", "An error occurred during registration");
        console.log("error", error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>TODO-LIST</Text>
      </View>
      <KeyboardAvoidingView style={styles.formContainer}>
        <Text style={styles.formTitle}>Register to your account</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="person" size={24} color="gray" />
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
            placeholder="Enter your name"
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={24} color="gray" />
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            placeholder="Enter your email"
          />
        </View>
        <View style={styles.inputContainer}>
          <AntDesign name="lock1" size={24} color="gray" />
          <TextInput
            value={password}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            placeholder="Enter your password"
          />
        </View>
        <Pressable onPress={handleRegister} style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Register</Text>
        </Pressable>
        <Pressable onPress={() => router.replace("/login")} style={styles.loginLink}>
          <Text style={styles.loginLinkText}>Already have an account? Sign In</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  logoContainer: {
    marginTop: 80,
  },
  logoText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0066b2",
  },
  formContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#E0E0E0",
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 30,
  },
  input: {
    color: "gray",
    marginVertical: 10,
    width: 300,
    fontSize: 17,
  },
  registerButton: {
    width: 200,
    backgroundColor: "#6699CC",
    padding: 15,
    borderRadius: 6,
    marginTop: 30,
  },
  registerButtonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginLink: {
    marginTop: 15,
  },
  loginLinkText: {
    textAlign: "center",
    fontSize: 15,
    color: "gray",
  },
});

export default Register;
