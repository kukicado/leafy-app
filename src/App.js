import React, {useState, useEffect} from 'react';
import { client, getLeafies, getSingleLeafy, saveLeafy } from "./Stitch";
import {
  AnonymousCredential,
} from "mongodb-stitch-browser-sdk";
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';

import './assets/main.css'

// Body Assets
import body1 from './assets/img/body/leaf-1.png';

// Eyes Assets
import eyes1 from './assets/img/eyes/eyes-1.png';
import eyes2 from './assets/img/eyes/eyes-2.png';
import eyes3 from './assets/img/eyes/eyes-3.png';
import eyes4 from './assets/img/eyes/eyes-4.png';

// Mouth Assets
import mouth1 from './assets/img/mouth/mouth-1.png';
import mouth2 from './assets/img/mouth/mouth-2.png';

// Head Accessory Assets
import wayfaeres from './assets/img/head-accessories/head-accessories-1.png';
import emeraldEarings from './assets/img/head-accessories/head-accessories-2.png';
import hat1 from './assets/img/head-accessories/hat-1.png'

// Arm assets
import arms1 from './assets/img/arms/arms-1.png';

function App() {
  const [leafyBody, setLeafyBody] = useState(body1);
  const [leafyEyes, setLeafyEyes] = useState(eyes1);
  const [leafyMouth, setLeafyMouth] = useState();
  const [leafyHeadAccessory, setLeafyHeadAccessory] = useState();
  const [leafyArms, setLeafyArms] = useState();
  const [leafyHair, setLeafyHair] = useState();
  const [leafyShirt, setLeafyShirt] = useState();
  const [leafyPants, setLeafyPants] = useState();

  let bodyAssets = [body1];
  let eyesAssets = [eyes1, eyes2, eyes3, eyes4];
  let mouthAssets = [mouth1, mouth2]
  let headAccessoryAssets = [hat1, wayfaeres, emeraldEarings];
  let armsAssets = [arms1];
  let hairAssets = [];
  let shirtAssets = [];
  let pantsAssets = [];

  useEffect(() => {
    if (client.auth.user) {
      console.log(client.auth.user)
    } else {
      client.auth
        .loginWithCredential(new AnonymousCredential())
        .then(user => {
          console.log(client.auth.user);
        })
        .catch(console.error);
    }
  }, []);

  const selectItem = (item, bodyPart) => {

    // eslint-disable-next-line default-case
    switch(bodyPart){
      case 'Body':
        setLeafyBody(item);
        break;
      case 'Eyes':
        setLeafyEyes(item);
        break;
      case 'Mouth':
        setLeafyMouth(item);
        break;
      case 'Head Accessory':
        setLeafyHeadAccessory(item);
        break;
      case 'Arms':
        setLeafyArms(item);
        break;
      case 'Hair':
        setLeafyHair(item);
        break;
      case 'Shirt':
        setLeafyShirt(item);
        break;
      case 'Pants':
        setLeafyPants(item);
        break;  
    }
  }

  const save = () => {
    let leafy = {
      configuration: {
        body: leafyBody,
        eyes: leafyEyes,
        mouth: leafyMouth,
        headAccessory: leafyHeadAccessory,
        arms: leafyArms,
        hair: leafyHair,
        shirt: leafyShirt,
        pants: leafyPants
      }
    }
    
    html2canvas(document.getElementById("leafy")).then(function(canvas) {
      console.log(canvas.toDataURL("image/png"));

      leafy.image = canvas.toDataURL("image/png");
      
      saveLeafy(leafy)
    });
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto">
        <div className="flex">
          <div className="w-2/3">
            <Preview leafyBody={leafyBody} leafyEyes={leafyEyes} leafyMouth={leafyMouth} leafyHeadAccessory={leafyHeadAccessory} leafyArms={leafyArms} leafyHair={leafyHair} leafyShirt={leafyShirt} leafyPants={leafyPants} />
          </div>
          <div className="w-1/3">
            <Panel title="Body" items={bodyAssets} selectItem={selectItem} />

            <Panel title="Eyes" items={eyesAssets} selectItem={selectItem}/>

            <Panel title="Mouth" items={mouthAssets} selectItem={selectItem}/>

            <Panel title="Head Accessory" items={headAccessoryAssets} selectItem={selectItem} />

            <Panel title="Arms" items={armsAssets} selectItem={selectItem}/>

            <Panel title="Hair" items={hairAssets} selectItem={selectItem}/>

            <Panel title="Shirt" items={shirtAssets} selectItem={selectItem}/>

            <Panel title="Pants" items={pantsAssets} selectItem={selectItem}/>

            <div className="bg-green-500 text-white text-center rounded py-5" onClick={()=>save()}>
              <span className="text-3xl">Save</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}


const Header = () => {
  return (
    <header className="bg-green-500 text-white mb-12">
      <div className="container mx-auto">
        <div className="flex py-4">
          <div className="w-1/3">
            <h2 className="text-2xl">Leafy Generator | <span className="text-xl">Leafify Yourself</span></h2>
          </div>
        </div>
      </div>
    </header>
  )
}


const Panel = ({title, items, selectItem}) => {
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    if(title === 'Body'){
      setOpen(!open);
    }
  }, [])

  const toggle = () => {
    setOpen(!open);
  }
  return (
    <div className="bg-white shadow-lg mb-5 rounded overflow-hidden">
      <div className="bg-gray-200 px-5 py-2" onClick={()=>toggle()}>
        <span>{title}</span>
      </div>
      {open && <div className="flex flex-wrap">
      <div className="w-1/3 item p-5 text-center" onClick={() => selectItem("", title)}>
        None
      </div>
        {items.map(item => (
          <div className="w-1/3 item p-5" onClick={() => selectItem(item, title)}>
            <img src={item} className="w-full" />
          </div>
        ))}
      </div>
      }
    </div>
  )
}


const Preview = ({leafyBody, leafyEyes, leafyMouth, leafyHeadAccessory, leafyArms, leafyHair, leafyShirt, leafyPants}) => {

  return (
    <div>
      <div id="leafy" className="text-center relative h-leafy w-leafy">
      <div className="body">
          <img className="absolute" src={leafyBody}/>
        </div>
        <div className="eyes">
          <img className="absolute" src={leafyEyes} />
        </div>
        <div className="eyes">
          <img className="absolute" src={leafyMouth} />
        </div>
        <div className="head-accessory">
          <img className="absolute" src={leafyHeadAccessory} />
        </div>
        <div className="arms">
          <img className="absolute" src={leafyArms} />
        </div>
        <div className="hair">
          <img className="absolute" src={leafyHair} />
        </div>
        <div className="shirt">
          <img className="absolute" src={leafyShirt} />
        </div>
        <div className="pants">
          <img className="absolute" src={leafyPants} />
        </div>
      </div>
    </div>
  )
}

export default App;
