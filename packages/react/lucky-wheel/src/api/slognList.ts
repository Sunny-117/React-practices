export const getSlognList = async () => {
  try {
    const data = await fetch('/public/mock/slognList.json', {});
    return data.json();
  }
  catch (err) {
    console.log(err);
  }
}