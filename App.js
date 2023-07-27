import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Checkbox from "expo-checkbox";
import data from "./data/data.json";
import { useState } from "react";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  initialWindowMetrics,
} from "react-native-safe-area-context";

const Item = ({ item, onToggleChecked = () => {} }) => {
  const { id, name, text, checked } = item;
  return (
    <View style={styles.itemContainer}>
      <Text>{id}</Text>
      <Text>{name}</Text>
      <Text>{text}</Text>
      <Checkbox value={checked} onValueChange={onToggleChecked} />
    </View>
  );
};

export default function App() {
  const [checkedItems, setCheckedItems] = useState([]);

  const handleRenderItem = ({ item }) => {
    const checked = checkedItems.includes(item.id);
    return (
      <Item
        item={{ ...item, checked }}
        onToggleChecked={() => handleToggleChecked(item.id)}
      />
    );
  };

  const handleToggleChecked = (id) => {
    const newCheckedItems = checkedItems.includes(id)
      ? checkedItems.filter((item) => item !== id)
      : [...checkedItems, id];
    setCheckedItems(newCheckedItems);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          extraData={checkedItems}
          renderItem={handleRenderItem}
          keyExtractor={(item) => item.id}
          windowSize={10}
        />
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    flex: 1,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 5,
    margin: 4,
    padding: 4,
  },
});
