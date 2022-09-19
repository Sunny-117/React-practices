import RenderArrayDataIntoListsAndTables from "./package/RenderArrayDataIntoListsAndTables"


const App = () => {
  return (
    <div>
      <RenderArrayDataIntoListsAndTables data={[{ name: 'John', surname: 'Smith', age: 42 },
      { name: 'Adam', surname: 'Smith', gender: 'male' },]} propertyNames={[
        'a', 'b'
      ]} />
    </div>
  )
}

export default App