import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ProductList from "./screens/ProductList";
import EditProduct from "./screens/EditProduct";
import CreateProduct from "./screens/CreateProduct";
import { AppStackParamList } from "./types/navigation";

const Stack = createStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ProductList"
          component={ProductList}
          options={{ title: "Lista de Produtos" }}  
        />
        <Stack.Screen
          name="EditProduct"
          component={EditProduct}
          options={{ title: "Editar Produto" }}  
        />
        <Stack.Screen
          name="CreateProduct"
          component={CreateProduct}
          options={{ title: "Adicionar Produto" }}  
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;