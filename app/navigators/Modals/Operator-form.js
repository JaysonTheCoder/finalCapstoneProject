import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FormOperator from "../../../Screens/FormOperator";
const Stack = createNativeStackNavigator()

export const FormModal = function() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Form-Operator" options={{presentation: 'modal', headerShown: false}} component={FormOperator}/>
        </Stack.Navigator>
    )
}