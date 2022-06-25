// fetch data from express.js
export async function SandPListData() {
  const resp = await fetch("http://localhost:4000/getworststockdata");
  const jsonData = await resp.json();

  if (resp.status !== 200) {
    throw Error(jsonData.message);
  }
  console.log(`jsondata: ${jsonData}`);
  return jsonData;
}
