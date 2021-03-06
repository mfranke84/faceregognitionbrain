import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import SignIn from './Components/SignIn/SignIn'
import Register from './Components/Register/Register'
import FaceRegocnition from './Components/FaceRegocnition/FaceRegocnition'
import Particles from 'react-particles-js';
import './App.css';
import { Component } from 'react';
import Clarifai from 'clarifai';

const app = new Clarifai.App({apiKey: '1d90ddbaf08f4aa08d0efc2e8470061d'});

const particlesOptions ={
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 10
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = { 
      input: '',
      imageUrl: '',
      box: {},
      route: 'signIn',
      isSignedIn: false
    }
  }

  onInputChange = (event) => {
    this.setState( {input: event.target.value} );
    
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height) 
    }
  }

  displayFaceBox = (box) => {
    
    this.setState({box: box})
    
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input, {video: false})
      .then(response => {
        this.displayFaceBox( this.calculateFaceLocation(response) )
        
  
      }) 
      .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if (route === 'signOut'){
       this.setState({isSignedIn: false})
    }else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render () {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles className='particles' 
          params={particlesOptions}
          />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn }/>
        { route === 'home' 
           ? <div> 
              <Logo />
              <Rank />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit} 
              />
              <FaceRegocnition box={box} imageUrl={imageUrl}/>
            </div> 
           : (
              route === 'signIn'
              ? <SignIn onRouteChange ={this.onRouteChange} />
              : <Register onRouteChange={this.onRouteChange} />
            )
        }
      </div>
    );
  }
}

export default App;
