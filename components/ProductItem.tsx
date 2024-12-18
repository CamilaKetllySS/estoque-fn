import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Button, Alert } from "react-native";
import { API_BASE_URL } from "@env";
import { deleteProduct } from "../api/productService";
import { updateProduct } from "../api/productService";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamList } from "../types/navigation";

type ProductItemProps = {
  product: {
    _id: string;
    name: string;
    description: string;
    quantity: number;
    price: number;
    image: string;
  };
  onRefresh: () => void;
};

type NavigationProp = StackNavigationProp<AppStackParamList, "EditProduct">;

const ProductItem: React.FC<ProductItemProps> = ({ product, onRefresh }) => {
  const navigation = useNavigation<NavigationProp>();
  const [imageUri, setImageUri] = useState<string | null>(product.image ? `${API_BASE_URL}/${product.image}` : null);

  const handleDelete = async () => {
    try {
      await deleteProduct(product._id);
      Alert.alert("Sucesso", "Produto deletado com sucesso!");
      onRefresh();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível deletar o produto.");
    }
  };

  const handleSell = async () => {
    if (product.quantity <= 0) {
      Alert.alert("Erro", "Quantidade insuficiente em estoque.");
      return;
    }

    try {
      const updatedQuantity = product.quantity - 1;
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("quantity", updatedQuantity.toString());
      formData.append("price", product.price.toString());

      if (product.image) {
        formData.append("image", product.image);
      }

      await updateProduct(product._id, formData);
      Alert.alert("Sucesso", "Venda realizada com sucesso!");
      onRefresh();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível realizar a venda.");
    }
  };

  const handleEdit = () => {
    navigation.navigate("EditProduct", { product });
  };

  return (
    <View style={styles.card}>
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
        />
      )}
      <Text style={styles.name}>{product.name}</Text>
      <Text>{product.description}</Text>
      <Text>Quantidade: {product.quantity}</Text>
      <Text>Preço: R$ {product.price.toFixed(2)}</Text>
      <View style={styles.buttonContainer}>
        {product.quantity > 0 ? (
          <Button title="Realizar Venda" onPress={handleSell} />
        ) : (
          <Text style={styles.outOfStockText}>OUT OF STOCK</Text>
        )}
        <Button title="Editar" onPress={handleEdit} />
        <Button title="Deletar" color="red" onPress={handleDelete} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f9f9f9",
    marginVertical: 8,
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  outOfStockText: {
    color: "red",
    fontSize: 16,
    marginTop: 10,
  },
});

export default ProductItem;