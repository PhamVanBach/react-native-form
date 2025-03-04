import React from 'react';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

const Clock = () => {
  const [seconds, setSeconds] = useState(Date.now() / 1000);

  const tick = () => {
    setSeconds(Date.now() / 1000);
  };

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return () => clearInterval(timerID);
  }, []);

  return (
    <View>
      <Text>{`${seconds} seconds have elapsed since the UNIX epoch.`}</Text>
    </View>
  );
};

export default Clock;
