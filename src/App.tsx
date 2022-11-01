import { Accordion, AccordionItem } from "./components/Visual视觉效果渲染/Accordion"


export const App = () => {
  return (

    <div>
      <Accordion defaultIndex="1" onItemClick={console.log(222)}>
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
