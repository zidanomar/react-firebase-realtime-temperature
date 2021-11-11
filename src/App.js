import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from './firebase';

function App() {
  const temperatureRef = ref(database, 'TEMPERATURE');

  const [temperature, setTemperature] = useState(0);
  const [isTextChanged, setIsTextChanged] = useState(false)

  const textClasses = `text-classes ${ isTextChanged ? 'text-changed' : ''}`;

  useEffect(() => {
    onValue(temperatureRef, (snapshot) => {
      const data = snapshot.val();
      setTemperature(data);
      console.log(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsTextChanged(true);

    const timer = setTimeout(() => {
      setIsTextChanged(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [temperature]);

  let temperatureClass;
  let message;

  if (temperature < 24 ) {
    temperatureClass = 'cold';
    message = 'Indomie sabi parah sih'
  } else if (temperature >= 24 && temperature < 30) {
    temperatureClass = 'warm';
    message = 'Rock On!';
  } else {
    temperatureClass = 'hot';
    message = 'Buring plains...';
  }

  return (
    <div className={`container ${temperatureClass}`}>
      <div className={textClasses}>
        <h1>
          {temperature}
          <span>°C</span>
        </h1>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default App;
