//KeyName which key you want to update

export const generateRandomImages = (data, imageArr, keyName) => {
  return data.map(item => {
    const randomImageIndex = Math.floor(Math.random() * imageArr.length);
    return {
      ...item,
      [keyName]: imageArr[randomImageIndex],
    };
  });
};

export const generateWaveformArray = length => {
  const min = 20;
  const max = 90;

  let waveformArray = [];

  for (let i = 0; i < length; i++) {
    // Generate a random value between 20 and 90
    const value = Math.floor(Math.random() * (max - min + 1)) + min;

    waveformArray.push(value);
  }

  return waveformArray;
};
