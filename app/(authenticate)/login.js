import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  
  useEffect(() => {
    (async function () {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          router.replace("/(tabs)/home");
        }
      } catch (error) {
        console.log(error);
      }
    }());
  }, []);

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios.post("http://192.168.150.81:3000/api/auth/login", user).then((response) => {
      const token = response.data.token;
      AsyncStorage.setItem("authToken", token);
      Alert.alert(
        "You have been logged in  successfully"
      );
      router.replace("/(tabs)/home");
    })
    .catch((error) => {
      Alert.alert("Login failed", "An error occurred during Login");
      console.log("error", error);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>TODO-LIST</Text>
      </View>
      <KeyboardAvoidingView style={styles.formContainer}>
        <Text style={styles.formTitle}>Log in to your account</Text>
        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={24} color="gray" />
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            placeholder="enter your email"
          />
        </View>
        <View style={styles.inputContainer}>
          <AntDesign name="lock1" size={24} color="gray" />
          <TextInput
            value={password}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            placeholder="enter your password"
          />
        </View>
     
        <View style={styles.buttonsContainer}>
          <Pressable onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </Pressable>
          <Pressable
            onPress={() => router.replace("/register")}
            style={styles.signupButton}
          >
            <Text style={styles.signupButtonText}>
              Don't have an account? Sign up
            </Text>
          </Pressable>
        </View>
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
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    justifyContent: "space-between",
  },
 
  buttonsContainer: {
    marginTop: 60,
  },
  loginButton: {
    width: 200,
    backgroundColor: "#6699CC",
    padding: 15,
    borderRadius: 6,
    marginLeft: "auto",
    marginRight: "auto",
  },
  loginButtonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  signupButton: {
    marginTop: 15,
  },
  signupButtonText: {
    textAlign: "center",
    fontSize: 15,
    color: "gray",
  },
});

export default Login;
