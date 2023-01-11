import { useState } from 'react';
import styles from './App.module.css';
import poweredImage from './assets/powered.png';
import leftArrowImage from './assets/leftarrow.png'
import { levels, calculateImc, Level } from './helpers/imcs';
import { GridItem } from './components/index' 

const App = () => {
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [showItem, setShowItem] = useState<Level | null>(null);

  const handleCalculeteButton = () =>{
    if(heightField && weightField){
      setShowItem(calculateImc(heightField, weightField));
    }else{
      alert('Preencha todos os campos!')
    }
  }
  const handleBackButton = () =>{
    setShowItem(null);
    setHeightField(0);
    setWeightField(0);
  }


  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="IMC" width={70}/>
          <p>Gguife</p>
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule seu IMC</h1>
          <p>IMC é sigla para Índice de Massa Corpórea, parâmetro adotado pela OMS para calcular o peso ideal de cada pessoa.</p>

          <input 
          type="number"
          placeholder='Digite a sua altura (em métros)'
          value={heightField > 0 ? heightField : ''}
          onChange={e => setHeightField(parseFloat(e.target.value))}
          disabled={showItem ? true : false}
          />
          <input 
          type="number"
          placeholder='Digite a seu peso (em Kg)'
          value={weightField > 0 ? weightField : ''}
          onChange={e => setWeightField(parseFloat(e.target.value))}
          disabled={showItem ? true : false}
          />

          <button onClick={handleCalculeteButton} disabled={showItem ? true : false}>Calcular</button>
        </div>
        <div className={styles.rightSide}>
          {!showItem &&        
            <div className={styles.grid}>
            {levels.map((item, key)=>(
              <GridItem key={key} item={item} />
            ))}
            </div>
          }
          {showItem &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt='' width={25}/>
              </div>
              <GridItem item={showItem}/>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default App