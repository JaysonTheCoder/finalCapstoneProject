

import { createDrawerNavigator, DrawerItemList } from "@react-navigation/drawer";
import OperatorHomescreen from "../../../Screens/OperatorHomescreen";
import { TouchableOpacity } from "react-native";
import { Image, Text, View } from "react-native";
import Rates from "../../../Modals/Rates";

export default function OperatorDrawerProvider() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        const currentRoute = props.state?.routeNames[props.state?.index] || "";

        if (currentRoute === "Home") {
          return (
            <View>
              <View style={{ justifyContent: "center", padding: 30, height: 200 }}>
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
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <TouchableOpacity style={{ marginRight: 15 }}>
            <View style={{ alignItems: "flex-end" }}>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Image
                  source={require("../../../assets/images/Marker.png")}
                  style={{ width: 70, height: 70, borderRadius: 50 }}
                />
              </View>
            </View>
          </TouchableOpacity>
        ),
        headerTitleAlign: "center",
      })}
    >

      <Drawer.Screen
        name="Home"
        component={OperatorHomescreen}
        options={{ headerTransparent: true, headerTitle: "" }}
      />

      <Drawer.Screen
        name="Rates"
        component={Rates}
        options={{
          headerStyle: { backgroundColor: "#F4B446" },
          headerTitleStyle: { fontFamily: "Poppins-Regular" },
        }}
      />
    </Drawer.Navigator>
  );
}
