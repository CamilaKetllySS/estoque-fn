import React, { useState, useCallback } from "react";
import { View, FlatList, StyleSheet, Button, ActivityIndicator } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import apiClient from "../api/apiClient";
import ProductItem from "../components/ProductItem";
import { AppStackParamList } from "../types/navigation";

type ProductListScreenProp = StackNavigationProp<AppStackParamList, "ProductList">;

interface Product {
  _id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  image: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<ProductListScreenProp>();

  const fetchProducts = async () => {
    try {
      const response = await apiClient.get("/");
      console.log("Produtos recebidos da API:", response.data); 
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchProducts();
    }, [])
  );

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ProductItem product={item} onRefresh={fetchProducts} />
        )}
      />
      <Button title="Adicionar Produto" onPress={() => navigation.navigate("CreateProduct")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
});

export default ProductList;