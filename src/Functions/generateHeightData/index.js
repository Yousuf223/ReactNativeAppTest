export const generateHeightData = () => {
    const heights = [];
    for (let feet = 4; feet <= 7; feet++) {
      for (let inches = 0; inches < 12; inches++) {
        heights.push(`${feet}'${inches}`);
      }
    }
    return heights;
  };