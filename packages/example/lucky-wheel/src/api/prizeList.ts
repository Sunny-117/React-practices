export const getPrizeList = async () => {
  try {
    const data = await fetch('/public/mock/prizeList.json', {});
    return data.json();
  }
  catch (err) {
    console.log(err);
  }
}