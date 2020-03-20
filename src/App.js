import React, {useState, useEffect} from 'react';
import { client, getLeafies, getSingleLeafy, saveLeafy } from "./Stitch";
import {
  AnonymousCredential,
} from "mongodb-stitch-browser-sdk";
import html2canvas from 'html2canvas';

import './assets/main.css'

// Body Assets
import body1 from './assets/img/body/leaf-1.png';
import body2 from './assets/img/body/leaf-2.png';

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
import hat2 from './assets/img/head-accessories/hat-2.png'

// Hair assets
import hair1 from './assets/img/hair/hair-1.png';

// Arm assets
import arms1 from './assets/img/arms/arms-1.png';
import arms2 from './assets/img/arms/arms-2.png';

// Shirt assets
import shirt1 from './assets/img/shirt/shirt-1.png';
import shirt2 from './assets/img/shirt/shirt-2.png';
import shirt3 from './assets/img/shirt/shirt-3.png';
import shirt4 from './assets/img/shirt/shirt-4.png';

// Pants assets
import pants1 from './assets/img/legs/legs-1.png';
import pants2 from './assets/img/legs/legs-2.png';

function App() {
  const [leafies, setLeafs] = useState([]);
  const [leafyBody, setLeafyBody] = useState(body1);
  const [leafyEyes, setLeafyEyes] = useState(eyes1);
  const [leafyMouth, setLeafyMouth] = useState();
  const [leafyHeadAccessory, setLeafyHeadAccessory] = useState();
  const [leafyArms, setLeafyArms] = useState();
  const [leafyHair, setLeafyHair] = useState();
  const [leafyShirt, setLeafyShirt] = useState();
  const [leafyPants, setLeafyPants] = useState();

  let bodyAssets = [body1, body2];
  let eyesAssets = [eyes1, eyes2, eyes3, eyes4];
  let mouthAssets = [mouth1, mouth2]
  let headAccessoryAssets = [hat1, hat2, wayfaeres, emeraldEarings];
  let armsAssets = [arms1, arms2];
  let hairAssets = [hair1];
  let shirtAssets = [shirt1, shirt2, shirt3, shirt4];
  let pantsAssets = [pants1, pants2];


  useEffect(() => {
    if (client.auth.user) {
      getLeafies().then(creations => {
        console.log(creations);
        setLeafs(creations);
      })
    } else {
      client.auth
        .loginWithCredential(new AnonymousCredential())
        .then(user => {
          getLeafies().then(creations => {
            setLeafs(creations);
          })
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
    
    html2canvas(document.getElementById("leafy"), {height: 750, width: 750}).then(function(canvas) {
      console.log(canvas.toDataURL("image/png"));

      leafy.image = canvas.toDataURL("image/png");
      
      saveLeafy(leafy).then(()=>{
        getLeafies().then(creations => {
          setLeafs(creations);
          
          // Reset Leafy
          setLeafyBody(body1);
          setLeafyEyes(eyes1);
          setLeafyMouth();
          setLeafyHeadAccessory();
          setLeafyArms();
          setLeafyHair();
          setLeafyShirt();
          setLeafyPants();

        })
      })
      
    });
  }

  const lucky = () => {
    // get random body
    let bodyItem = randomNumber(bodyAssets.length);
    setLeafyBody(bodyAssets[bodyItem]);

    // get random eyes
    let eyesItem = randomNumber(eyesAssets.length);
    setLeafyEyes(eyesAssets[eyesItem]);

    // get random mouth
    let mouthItem = randomNumber(mouthAssets.length);
    setLeafyMouth(mouthAssets[mouthItem]);

    // get random head accessory
    let haItem = randomNumber(headAccessoryAssets.length);
    setLeafyHeadAccessory(headAccessoryAssets[haItem]);

    // get random arms
    let armsItem = randomNumber(armsAssets.length);
    setLeafyArms(armsAssets[armsItem]);

    // get random hair
    let hairItem = randomNumber(hairAssets.length);
    setLeafyHair(hairAssets[hairItem]);

    // get random shirt
    let shirtItem = randomNumber(shirtAssets.length);
    setLeafyShirt(shirtAssets[shirtItem]);

    // get random pants
    let pantsItem = randomNumber(pantsAssets.length);
    setLeafyPants(pantsAssets[pantsItem]);

  }

  const randomNumber = (max) => {
    return Math.floor(Math.random() * (max - 0) ) + 0;
  }

  const reset = () => {
    // Reset Leafy
    setLeafyBody(body1);
    setLeafyEyes(eyes1);
    setLeafyMouth();
    setLeafyHeadAccessory();
    setLeafyArms();
    setLeafyHair();
    setLeafyShirt();
    setLeafyPants();
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

            <div className="bg-green-500 text-white text-center rounded py-5 mb-5" onClick={()=>save()}>
              <span className="text-3xl">Save</span>
            </div>
            <div className="bg-blue-500 text-white text-center rounded py-2 mb-5" onClick={()=>lucky()}>
              <span className="text-xl">I'm Feeling Lucky</span>
            </div>
            <div className="bg-red-500 text-white text-center rounded py-2" onClick={()=>reset()}>
              <span className="">Oh, Crap! Reset!</span>
            </div>
          </div>
        </div>
      </div>
    
      <div className="container mx-auto my-24">
        <h2 className="text-2xl">Community Created Leafies!</h2>
        <div className="flex flex-wrap">
          {leafies && leafies.map(creation => (
            <div className="w-1/4" key={creation._id.toString()}>
              <Creation creation={creation} />
            </div>
          ))}
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
            <h2 className="text-2xl font-bold">Leafy Generator | <span className="text-xl">Leafify Yourself</span></h2>
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
        {items.map((item, id) => (
          <div className="w-1/3 item p-5" onClick={() => selectItem(item, title)} key={id}>
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

const Creation = ({creation}) => {
  return (
    <div className="creation">
      <img src={creation.image} />
    </div>
  )
}

export default App;
