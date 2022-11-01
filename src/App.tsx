export const App = () => {
  return (

    <div>
      <Accordion defaultIndex="1" onItemClick={console.log}>
        <AccordionItem label="A" index="1">
          Lorem ipsum
        </AccordionItem>
        <AccordionItem label="B" index="2">
          Dolor sit amet
        </AccordionItem>
      </Accordion>
    </div>
  )
}
