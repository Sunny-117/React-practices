export const getWheelPrizeList = async () => {
  try {
    const data = await fetch('/public/mock/wheelPrizeList.json', {});
    return data.json();
  }
  catch (err) {
    console.log(err);
  }
}