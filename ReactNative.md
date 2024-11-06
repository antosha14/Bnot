const { Pressable } = require("react-native");

const { Text } = require("react-native")

`
Nativewind
Expo

View (<div> на стероидах flex by default), Text (<p>/<h>)
StyleSheet
styles = StyleSheet.create({text: fontSize:24,}) и далее можем использовать styles.text в стилях

TouchableOpacity (просто кнопка)
TouchableHighlight(кнопка меняющая лейаут)
Touchablewithoutfeedback (без эффектов)
ActivityIndicator - spinner or loading indicator

Button (title, color, onPress)

Flatlist (для отображения БОЛЬШИХ списков, маленькие - map )
ScrollView (scrolling container for multiple components and views owerflow: scroll)
SafeAreaView - Зона, не покрытая хадвеером (react-native-safe-area-context)
react-native-safe-area-context

Image
ImageBackground
React-native-svg

Modal, Alert
Switch - Уже готовый toggle
StatusBar - определяют как должно выглядеть окружение контейнера с аппкой

Stack

npx create-expo-app ./
npx expo install dependencies from docs
Change expo main
npx expo start -c
`
<Text>
<View></View>

<Button title="Button Text" color='' onPress=''></Button>
<Image source={require('../assets')}></Image>
<Image source={{uri:'../assets'}}></Image>

<Pressable>
    <Text>Press me</Text>
</Pressable>

//onPress
//onPressIn - start
//onPressOut - end
//onLongPress

`Styling a component`
`Inline`
style={{backgroundColor: 'red'}}

`StyleSheet from 'react-native'`
const styles = StyleSheet.create({
textStyle: {color: 'crimson', fontSize: 50}
})
<Text style={styles.textStyle}>

`NativeWind`

import { Slot } from 'expo-router'; - в лейауте для остатков
Альтернативный роутинг через Stack и Stack.Screen

<Stack>
    <Stack.Screen name="route" options={{headerShown: false}}/>
</Stack>
import { Link } from 'expo-router';
<Link href="/">

Шрифты импортируются с помощью специального хука

const [fontsLoaded, error] = useFonts({ 'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf') });

Но в эффекте также нужно вызвать
SplashScreen.hideAsync()

А это над лейаутом
SplashScreen.preventAutoHideAsync();
