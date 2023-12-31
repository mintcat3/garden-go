import { StatusBar } from 'expo-status-bar';
import {ImageBackground, StyleSheet, Text, View, Image, Button, useWindowDimensions, FlatList, SafeAreaView, ScrollView,TouchableOpacity,Alert,Touchable, TextInput} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetRefProps } from './components/BottomSheet';
import CollapsibleList from './CollapsibleList';
import { useFonts } from 'expo-font';



const renderScene = SceneMap({

  
  first: HomeScreen,
  second: DetailsScreen,  
  third: Profile,
  fourth: AboutScreen,
  fifth: searchBar,

});



function Profile(){
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    fetch('http://192.168.0.100:3000/data',{
      method:'GET'
    })
    .then(Response => Response.json())
    .then(article => {
      setData(article)
      
    })
  },[])
  return(
    <View>
      <View style={{backgroundColor: '#bee3ba'}}>
        <View style={{padding:10, width:'100%', backgroundColor: '#5FA052', height: 175}}>
        </View>
        <View style={{alignItems:'center', backgroundColor: '#bee3ba'}}>
          <Image source={require('./imgs/IMG_3484.jpg')} style={{width:140, height:140,borderRadius:100,marginTop: -70}}></Image>
          <Text style={{fontSize: 25,fontWeight:'bold',padding:10}}>John Doe</Text>
          <Text style={{fontSize: 15,fontWeight:'bold',color: 'grey'}}>Member since August 12, 2023</Text>
        </View>
        <View style={{alignSelf: 'center', flexDirection:'row',justifyContent:'center',backgroundColor:'#fff',width:'90%',padding:20,paddingBottom:22,borderRadius:10,shadowOpacity:80,elevation:15,marginTop:20}}>
          <Image source={require('./imgs/star.png')} style={{width:20,height:20}}></Image>
          <Text style={{marginTop:4}}>Points: 0</Text>
        </View>
        <TouchableOpacity style={{alignSelf: 'center', flexDirection:'row',justifyContent:'center',backgroundColor:'#fff',width:'90%',padding:20,paddingBottom:22,borderRadius:10,shadowOpacity:80,elevation:15,marginTop:20}}>
          <Image source={require('./imgs/bell.png')} style={{width:20,height:20}}></Image>
          <Text>Missions</Text>
          <Text>Time left: {data.HoursLeft} hours</Text>
        </TouchableOpacity>
        <View style={{alignSelf: 'center', flexDirection:'row',justifyContent:'center',backgroundColor:'#fff',width:'90%',padding:20,paddingBottom:22,borderRadius:10,shadowOpacity:80,elevation:15,marginTop:20}}>
          <Image source={require('./imgs/pottedplant.png')} style={{width:20,height:25}}></Image>
          <Text style={{marginTop:4}}>No. of Plants: 0</Text>
        </View>
        <TouchableOpacity style={{alignSelf: 'center', flexDirection:'row',justifyContent:'center',backgroundColor:'#000',width:'90%',padding:20,paddingBottom:22,borderRadius:10,shadowOpacity:80,elevation:15,marginTop:20, marginBottom:40}}>
          <Text style={{fontSize:15,color:'#fff',fontWeight:'bold',marginLeft:10}}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor: '#bee3ba', height: 200}}></View>
    </View>
  )
}

function HomeScreen({ navigation }) {
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    fetch('http://192.168.0.100:3000/data',{
      method:'GET'
    })
    .then(Response => Response.json())
    .then(article => {
      setData(article)
      
    })
  },[])

  const ref = React.useRef<BottomSheetRefProps>(null);

  const onPress = React.useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-200);
    }
  }, []);
  
  return (

    <GestureHandlerRootView style={{ flex: 1 }}>
      
      <View style={styles.container}>
        <StatusBar style="light" />
        <Text style={{fontSize: 40, marginTop: '9%', textAlign: 'center', color: '#074415', fontWeight: 'bold'}}>
          GardenGO
        </Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Image source={require('./flask-server/TEST.jpeg')} style={{width: '100%', height: '100%'}}></Image>
        </TouchableOpacity>
        <View style={{marginTop: '5%', alignContent: 'center'}}>
          <Text style={{textAlign: 'center', fontSize: 20, color: 'green'}}>
            Water your plant!!!
          </Text>
          <Text style={{marginLeft: '2%', marginTop: '2%', fontSize: 15, color: 'green', textAlign:'center'}}>
            Time left:{data.HoursLeft} hours
          </Text>
        </View>


        <BottomSheet ref={ref}>
          <Text style={styles.title}>Pruning</Text>
          <Text style={styles.text}>
            {data.prune}
          </Text>
          <Text style={styles.title}>Sun</Text>
          <Text style={styles.text}>
            {data.sun}
          </Text>
          <Text style={styles.title}>Water</Text>
          <Text style={styles.text}>
            {data.water}
          </Text>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>

    /*
    <ScrollView style={{flex: 1, backgroundColor: '#13ec5a'}}>
      <ImageBackground source={require('./imgs/background.jpg')} resizeMode="cover" style={{height:'150%', width:'100%'}}>
      <Text style={{fontSize: 40, marginTop: '9%', textAlign: 'center', color: '#074415', fontWeight: 'bold'}}>
        GardenGO
      </Text>
      <TouchableOpacity style={{marginTop: '5%', backgroundColor: '#c7f9d2', width: '50%', marginLeft: '25%', height: '50%', justifyContent: 'center'}}
        onPress={console.log('hi')}>
          <Image source={require('./imgs/plant.png')} style={{width: '100%', height: '100%'}}></Image>
      </TouchableOpacity>
      <View style={{marginTop: '5%', alignContent: 'center'}}>
        <Text style={{textAlign: 'center', fontSize: 20, color: 'green'}}>
          {data.Name}
        </Text>
        <Text style={{marginLeft: '2%', marginTop: '2%', fontSize: 15, color: 'green'}}>
          {data.prune}
        </Text>
      </View>
      </ImageBackground>
    </ScrollView>
    */
    

  );
}


function DetailsScreen({ navigation }) {
  return (
    <SafeAreaView style = {{flex: 1}}>
      <ScrollView>
        <View>

          <Text style={{textAlign: 'center', fontSize: 35, marginBottom: '4%', fontWeight: '600'}}>

            Plant Collection 
            <Image source={require('./imgs/planticon.png')} style={{width: 50, height: 50}}></Image>
          </Text>
          
        </View>
        
        <View style = {{flexDirection:'row', marginTop: '5%'}}>
          <TouchableOpacity>
            <Text style={{textAlign:'center'}}>Basil</Text>
            <Image source={require('./imgs/basil.jpg')} style={{width: 150, height: 200, marginLeft: '15%'}}></Image>
          </TouchableOpacity>
          <TouchableOpacity>
          <Text style={{textAlign:'center', marginRight: '25%'}}>Lavender</Text>
            <Image source={require('./imgs/lavender.jpg')} style={{width: 150, height: 200, marginRight: '15%'}}></Image>
          </TouchableOpacity>
        </View>

        <View style = {{flexDirection:'row', marginTop: '5%'}}>
          <TouchableOpacity>
          <Text style={{textAlign:'center'}}>Oregano</Text>
            <Image source={require('./imgs/oregano.jpg')} style={{width: 150, height: 200, marginLeft: '15%'}}></Image>
          </TouchableOpacity>
          <TouchableOpacity>
          <Text style={{textAlign:'center', marginRight: '25%'}}>Parsley</Text>
            <Image source={require('./imgs/parsley.jpg')} style={{width: 150, height: 200, marginRight: '15%'}}></Image>
          </TouchableOpacity>
        </View>

        <View style = {{flexDirection:'row', marginTop: '5%'}}>
          <TouchableOpacity>
          <Text style={{textAlign:'center'}}>Rose</Text>
            <Image source={require('./imgs/rose.jpg')} style={{width: 150, height: 200, marginLeft: '15%'}}></Image>
          </TouchableOpacity>
          <TouchableOpacity>
          <Text style={{textAlign:'center', marginRight: '25%'}}>Rosemary</Text>
            <Image source={require('./imgs/rosemary.jpg')} style={{width: 150, height: 200, marginRight: '15%'}}></Image>
          </TouchableOpacity>
        </View>

        <View style = {{flexDirection:'row', marginTop: '5%'}}>
          <TouchableOpacity>
            <Text style={{textAlign:'center'}}>Sage</Text>
            <Image source={require('./imgs/sage.jpg')} style={{width: 150, height: 200, marginLeft: '15%'}}></Image>
          </TouchableOpacity>
          <TouchableOpacity>
          <Text style={{textAlign:'center', marginRight: '25%'}}>thyme</Text>
            <Image source={require('./imgs/thyme.jpg')} style={{width: 150, height: 200, marginRight: '15%'}}></Image>
          </TouchableOpacity>
        </View>
        
      </ScrollView>
    </SafeAreaView>  
  );
}

//const Stack = createNativeStackNavigator();


function AboutScreen({ navigation }) {
  const data = [
    { title: 'What is Garden Go?', content: 'Garden Go is a mobile app dedicated to inspiring more people to become gardeners by gamifying the process.' },
    { title: 'How does gardening relate to environmental sustainability?', 
    content: 'Just like trees, ordinary garden plants also absorb carbon dioxide and release oxygen. This helps mitigate the effects of climate change. \n Store bought foods create pollution through transportation and packaging. Growing your own fruit, vegetables, and herbs reduces the need to buy store bought. \n Proper gardening enhances soil health, which is better at retaining water and reduces the need for irrigation. This helps manage water runoff and prevent soil erosion, preventing flooding and reducing water pollution. \n Urban areas have heat islands, which can be shaded and cooled through the shade of trees and plants. \n Replacing the classic green lawn reduces lawn maintenance (and the water bill!) which can be even better if replaced with plants native to your area. \n' },
    { title: 'What else can I do to care for the environment through my garden?', 
    content: 'tbd' },
  ];

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./imgs/green-cartoon-plant-bg.jpg')} style={{width: '100%', height: '100%', justifyContent: 'center'}}>
        <SafeAreaView style={{ flex: 1 }}>
          <Text style ={styles.aboutTitle}>About</Text>
          <ScrollView>
            <CollapsibleList data={data} />
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

function App() {

    const [fontsLoaded, fontError] = useFonts({
      'Rubik': require('./assets/fonts/Rubik/static/Rubik-Regular.ttf'),
    });
  

    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(1);
    const [routes] = React.useState([
      { key: 'third', title: 'Profile' },
      { key: 'first', title: 'First' },
      { key: 'second', title: 'Second' },
      { key: 'fourth', title: 'About' },
      { key: 'fifth', title: 'Search'}
    ]);

    if (!fontsLoaded && !fontError) {
      return null;
    }

    function updateSearch(query) {
      console.log(value)
    };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      tabBarPosition='bottom'
      initialLayout={{ width: layout.width }}
    />
    
    /*
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    */
    
  );
}

function searchBar() {
  const [query, setQuery] = React.useState("");
  const [error, setError] = React.useState();
  //const [items, setItems] = useState([])
  const items = [
    "Rose", "Tulips", "Lavender", "Cactus", "Sunflower", "Daffodil", "Dandelion", "Daisy", "Watermelon", "Tree", "Pumpkin", "Weeds", "Cattail", "Pears", "Corn"
  ];
 
  const inputRef = React.useRef()
  const filteredItems = React.useMemo(() => {
    return items.filter(item => {
      return item.toLowerCase().includes(query.toLowerCase())
    })
  }, [items, query])
  return (
      <ImageBackground source={require('./imgs/image.jpg')}>
        <View style={[styles.container]}>
          <View style={styles.searchContainer}>
              <View style={styles.vwSearch}>
               
                  <Image
                      style={styles.icSearch}
                      source={require('./imgs/ic_search.png')} />
              </View>




              <TextInput
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  type="search"
                  placeholder="Search for plants!"
                  style={styles.textInput}
                  onChangeText={(text) => {
                          setQuery(text)
                      }
                  }
              />
              {
                  query ?
                      <TouchableOpacity
                          onPress={() => setQuery('')}
                          style={styles.vwClear}>
                          <Image
                              style={styles.icClear}
                              source={require('./imgs/ic_clear.png')} />
                      </TouchableOpacity>
                      : <View style={styles.vwClear} />
              }
             




            </View>
          <View style={[styles.resultContainer]}>
            {filteredItems.map(item => (
              <Text style={styles.resultText}>{item}</Text>
            ))}
          </View>
        </View>
      </ImageBackground>    
  )
}


const styles = StyleSheet.create({

  txtError: {
      marginTop: '2%',
      width: '89%',
      color: 'white',

  },
  vwClear: {
      flex: 0.2,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 30,
      // width: 25,
      // height: 25,
  },
  textInput: {
      // backgroundColor: 'green',
      flex: 1,
      fontSize: 20,
      marginLeft: 40,
  },

  vwSearch: {
      flex: 0.2,
      justifyContent: 'center',
      alignItems: 'center',
      // width: 40,
      // backgroundColor: 'red'
  },
  icSearch: {
      height: 30, width: 30, marginLeft:50,
  },
  searchContainer:
  {
      backgroundColor: 'white',
      width: '90%',
      marginTop: 70,
      height: 40,
      flexDirection: 'row'

  },
  container: {
      alignItems: 'center',
      marginTop: 108,
      justifyContent: 'center',
      // height: '100%', width: '100%' 
  },
  resultContainer: {
    alignItems: 'center',
    marginTop: 80,
    height: 600,
    justifyContent: 'flex-start',
    // height: '100%', width: '100%' 
  },
  isClear: {
    height: 30, width: 30
  },
  resultText: {
    fontSize: 25,
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginBottom: 10,
    justyifyContent: 'bottom',
  },
  button:{
    height:60,
    aspectRatio:1,
    borderRadius:25,
    opacity:0.6,
  },
  container1:{
    flex:1,
    backgroundColor:'#73E2A7',
    alignItems:'center',
    justifyContent:'center',
  },
  title:{
    textAlign:'center',
    fontSize:25,
  },
  text:{
    textAlign:'center',
  },
  plantColLeft:{
    width: 150, height: 200, marginLeft: '15%',
    borderRadius: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  plantColRight:{
    width: 150, height: 200, marginRight: '15%',
    borderRadius: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  plantCardShadow:{
    flexDirection:'row', marginTop: '5%',
    borderRadius: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowOpacity: 80,
    shadowColor: 'black',
  },

  aboutTitle: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '600',

  },
});







export default App;