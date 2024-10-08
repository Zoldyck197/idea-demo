import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Alert, ScrollView, Dimensions } from "react-native";
import { Border, FontFamily, Color, FontSize } from '../GlobalStyles';

const { width, height } = Dimensions.get('window');

export default function SignInForm({ onSignIn, onSignUp, onForgetPassword, signIn }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    const formData = { email, password };

    try {
      const userData = await signIn(formData);
      if (userData) {
        onSignIn(); // Navigate to the next screen if sign-in is successful
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to sign in. Please try again.');
    }
  };

  const handleRegister = () => {
    setActiveTab('register');
    onSignUp();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Login to your account!</Text>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'login' ? styles.activeTab : styles.inactiveTab]} 
          onPress={handleSignIn}
        >
          <Text style={styles.tabButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'register' ? styles.activeTab : styles.inactiveTab]} 
          onPress={handleRegister}
        >
          <Text style={styles.tabButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {activeTab === 'login' && (
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Image
                style={styles.icon}
                resizeMode="cover"
                source={require("../assets/mail.png")}
              />
              <TextInput 
                style={styles.input} 
                placeholder="Email Address" 
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputContainer}>
              <Image
                style={styles.icon}
                resizeMode="cover"
                source={require("../assets/lock.png")}
              />
              <TextInput 
                style={styles.input} 
                placeholder="Password" 
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onForgetPassword}>
              <Text style={styles.forgotPassword}>Forgot your password?</Text>
            </TouchableOpacity>
            <Text style={styles.orText}>Or login with</Text>
            <View style={styles.socialIcons}>
              <Image style={styles.socialIcon} resizeMode="cover" source={require("../assets/google.png")} />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.colorWhite,
  },
  header: {
    backgroundColor: Color.colorMidnightblue,
    borderBottomRightRadius: Border.br_36xl,
    borderBottomLeftRadius: Border.br_36xl,
    padding: 16,
    marginBottom: 16,
    width: '100%',
    height: "20%",
  },
  headerText: {
    top: "50%",
    fontWeight: "700",
    textAlign: "center",
    color: Color.colorWhite,
    fontSize: FontSize.size_11xl,
    fontFamily: FontFamily.bitterBold,
  },
  tabContainer: {
    height: 60,
    width: "80%", // Set tab container width to 80% of screen width
    marginTop: -45,
    marginBottom: "5%",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Color.colorWhite,
    borderRadius: Border.br_120xl_5,
    backgroundColor: Color.colorGainsboro,
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Border.br_120xl_5,
  },
  activeTab: {
    backgroundColor: Color.colorLightBlue,
    borderColor: Color.colorWhite,
    borderWidth: 1,
  },
  tabButtonText: {
    color: Color.colorBlack,
    fontFamily: FontFamily.signikaRegular,
    fontSize: FontSize.size_xl,
    textAlign: "center",
  },
  scrollView: {
    flexGrow: 1,
    width: "100%", // Ensure the scroll view takes full width
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  form: {
    width: '90%', // Set form width to 90% of the screen width
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: 'center', // Center content vertically
  },
  inputContainer: {
    width: '100%', // Set input container to 100% width of the form
    marginTop: 20,
    borderWidth: 1,
    marginBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderRadius: Border.br_36xl,
    borderColor: Color.colorGray_100,
    backgroundColor: Color.colorWhite,
  },
  icon: {
    width: 24, // Adjusted icon size
    height: 24, // Adjusted icon size
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 55, // Increased height for better visibility
    paddingHorizontal: 16,
    color: Color.colorGray_100,
    fontSize: FontSize.size_xl,
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_36xl,
    width: "100%", // Ensure button takes full width of its parent container
  },
  loginButton: {
    height: 55,
    marginTop: 20,
    borderRadius: 28,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.colorMidnightblue,
  },
  loginButtonText: {
    color: Color.colorWhite,
    fontFamily: FontFamily.signikaRegular,
    fontSize: FontSize.size_xl,
    textAlign: "center",
  },
  forgotPassword: {
    textAlign: "center",
    color: Color.colorGray_100,
    fontSize: 14,
    marginVertical: 10,
    textDecorationLine: "underline",
    fontFamily: FontFamily.signikaRegular,
  },
  orText: {
    fontSize: 17,
    textAlign: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  socialIcons: {
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 20,
    justifyContent: "center",
  },
  socialIcon: {
    width: 33,
    height: 33,
    marginHorizontal: 8,
  },
});
