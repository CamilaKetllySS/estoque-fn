import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { createProduct } from "../api/productService";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamList } from "../types/navigation";

type CreateProductScreenProps = {
  navigation: StackNavigationProp<AppStackParamList, "CreateProduct">;
};

const CreateProduct: React.FC<CreateProductScreenProps> = ({ navigation }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permissão necessária", "É necessário permitir o acesso à galeria.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleCreate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("quantity", quantity);
      formData.append("price", price);

      if (imageUri) {
        const fileName = imageUri.split("/").pop();
        const fileType = fileName?.split(".").pop();
        formData.append("image", {
          uri: imageUri,
          name: fileName,
          type: `image/${fileType}`,
        } as any);
      }

      await createProduct(formData);
      Alert.alert("Sucesso", "Produto criado com sucesso!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar o produto.");
    }
  };

  const handleNumericInput = (value: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setter(numericValue);
  };

  const handleDecimalInput = (value: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const numericValue = value.replace(/[^0-9.]/g, "");
    setter(numericValue);
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Nome" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Descrição" value={description} onChangeText={setDescription} />
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        keyboardType="numeric"
        value={quantity}
        onChangeText={(value) => handleNumericInput(value, setQuantity)}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço"
        keyboardType="decimal-pad"
        value={price}
        onChangeText={(value) => handleDecimalInput(value, setPrice)}
      />
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        <Text style={styles.imagePickerText}>Selecionar Imagem</Text>
      </TouchableOpacity>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Button title="Adicionar Produto" onPress={handleCreate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  imagePicker: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  imagePickerText: {
    color: "#333",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 5,
    marginVertical: 10,
  },
});

export default CreateProduct;