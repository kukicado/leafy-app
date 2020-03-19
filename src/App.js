import React, {useState, useEffect} from 'react';
import './assets/main.css'

// Body Assets
import body1 from './assets/img/body/leaf-1.png';

// Eyes Assets
import eyes1 from './assets/img/eyes/eyes-1.png';

// Mouth Assets

// Head Accessory Assets
import wayfaeres from './assets/img/glasses/wayfarers.png';
import emeraldEarings from './assets/img/earings/emerald-earrings.png';

function App() {
  const [leafyBody, setLeafyBody] = useState(body1);
  const [leafyEyes, setLeafyEyes] = useState(eyes1);
  const [leafyMouth, setLeafyMouth] = useState();
  const [leafyHeadAccessory, setLeafyHeadAccessory] = useState();
  const [leafyHair, setLeafyHair] = useState();
  const [leafyShirt, setLeafyShirt] = useState();
  const [leafyPants, setLeafyPants] = useState();

  let bodyAssets = [body1];
  let eyesAssets = [eyes1];
  let mouthAssets = []
  let headAccessoryAssets = [wayfaeres, emeraldEarings];
  let hairAssets = [];
  let shirtAssets = [];
  let pantsAssets = [];

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
      case 'HeadAccessory':
        setLeafyHeadAccessory(item);
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

  return (
    <div>
      <Header />
      <div className="container mx-auto">
        <div className="flex">
          <div className="w-2/3">
            <Preview leafyBody={leafyBody} leafyEyes={leafyEyes} leafyMouth={leafyMouth} leafyHeadAccessory={leafyHeadAccessory} leafyHair={leafyHair} leafyShirt={leafyShirt} leafyPants={leafyPants} />
          </div>
          <div className="w-1/3">
            <Panel title="Body" items={bodyAssets} selectItem={selectItem} />

            <Panel title="Eyes" items={eyesAssets} selectItem={selectItem}/>

            <Panel title="Mouth" items={mouthAssets} selectItem={selectItem}/>

            <Panel title="HeadAccessory" items={headAccessoryAssets} selectItem={selectItem} />

            <Panel title="Hair" items={hairAssets} selectItem={selectItem}/>

            <Panel title="Shirt" items={shirtAssets} selectItem={selectItem}/>

            <Panel title="Pants" items={pantsAssets} selectItem={selectItem}/>
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


const Preview = ({leafyBody, leafyEyes, leafyMouth, leafyHeadAccessory, leafyHair, leafyShirt, leafyPants}) => {

  return (
    <div>
      <div className="text-center relative h-leafy w-leafy">
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
