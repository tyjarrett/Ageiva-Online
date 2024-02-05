import React from "react";
import { SafeAreaView, StyleSheet} from "react-native";
import { Text, Button , TextInput } from "react-native-paper";
import { useState } from "react";

type Props = {
    setCheckCreds: React.Dispatch<React.SetStateAction<boolean>>;
    setPage: React.Dispatch<React.SetStateAction<string>>;
  };

const CreateUserScreen = ( {setPage} : Props) => {
  const [pass, setPass] = useState("");
  const [user, setUser] = useState("");
  return (
  // <SafeAreaView style={commonStyles.safeAreaView}>
  //   <View style={{ backgroundColor: "#000", ...commonStyles.centerStack }}>
  //     <Title>Login Page</Title>
  //     <Text>{`Api res: ${apiRes}`}</Text>
  //     <Button onPress={getUserWithToken}>User with token</Button>
  //     <Button onPress={loginUsingCreds}>Login using creds</Button>
  //     <Button onPress={createUserPressed}>Create user</Button>
  //   </View>
  // </SafeAreaView>
    <SafeAreaView style={styles.container}>
      <Button style={style2.container} mode="contained" onPress={() => setPage("FirstScreen")}>
                  Back
      </Button>
      <Text variant="displayMedium">Logo</Text>
      <Text>Welcome</Text>
      <TextInput
        mode ="outlined"
        label="Email"
        value={user}
        onChangeText={user => setUser(user)}
      >    
      </TextInput>
      <TextInput
        mode ="outlined"
        label="Password"
        value={pass}
        onChangeText={pass => setPass(pass)}
        secureTextEntry = {true}
      >    
      </TextInput>
      <Button mode="contained" onPress={() => {
        console.log({user, pass});
        // loginUsingCreds();
      }}>
                  Create User
      </Button>
    </SafeAreaView>
  );
};
    
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    alignContent: "center",
    gap: 30,
    alignItems: "center",
    backgroundColor: "rgb(29, 27, 30)",
    justifyContent: "center",
  },
});
    
const style2 = StyleSheet.create({
  container: {
    position: "absolute",
    top: 30,
    left: 10,
    backgroundColor: "rgb(29, 27, 30)",
  },
});
  
export default CreateUserScreen;