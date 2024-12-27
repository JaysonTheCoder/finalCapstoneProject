import { createDrawerNavigator, DrawerItemList } from "@react-navigation/drawer";
import CommuterHomescreen from "../../../Screens/CommuterHomescreen";
import { MaterialIcons } from "@expo/vector-icons";
import { FormModal } from "../Modals/Operator-form";
import Schedule from "../../../Modals/Schedule";
import { View, Text, Image } from "react-native";

export default function CommuterDrawerProvider() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerActiveTintColor: "#F4B400",
        drawerInactiveTintColor: "#555",
        drawerStyle: { backgroundColor: "#fff" },
        headerStyle: { backgroundColor: "#F4B400" },
        headerTitleStyle: { color: "#000" },
      }}
      drawerContent={(props) => {
        const currentRoute = props.state?.routeNames[props.state?.index] || "";

        if (currentRoute === "Home") {
          return (
            <View>
              <View style={{ justifyContent: "center", padding: 30, height: 80 }}>
                <Image
                  style={{ width: 150, height: 150 }}
                  source={require("../../../assets/images/catexpress.png")}
                />
              </View>
              <View>
                <DrawerItemList {...props} />
              </View>
            </View>
          );
        }

        return <DrawerItemList {...props} />;
      }}
    >
      <Drawer.Screen
        name="Home"
        component={CommuterHomescreen}
        options={{
          title: "Home",
          drawerIcon: ({ size, color }) => <MaterialIcons name="home" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="OperatorForm"
        component={FormModal}
        options={{
          title: "Login as Operator",
          headerShown: false,
          drawerIcon: ({ size, color }) => <MaterialIcons name="person" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Schedule"
        component={Schedule}
        options={{
          title: "Bus Schedule",
          drawerIcon: ({ size, color }) => <MaterialIcons name="schedule" size={size} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
}
