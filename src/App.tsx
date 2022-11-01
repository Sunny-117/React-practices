import { Accordion, AccordionItem } from "./components/Visual视觉效果渲染/Accordion"
import { Carousel } from "./components/Visual视觉效果渲染/Carousel"


export const App = () => {
  return (

    <div>
      <div id="Accordion">
        <Accordion defaultIndex="1" onItemClick={console.log}>
          <AccordionItem label="A" index="1">
            Lorem ipsum
          </AccordionItem>
          <AccordionItem label="B" index="2">
            Dolor sit amet
          </AccordionItem>
        </Accordion>
      </div>
      <hr />
      <div id="Carousel">
        <Carousel
          carouselItems={[
            <div>carousel item 1</div>,
            <div>carousel item 2</div>,
            <div>carousel item 3</div>
          ]}
        />
      </div>
    </div>
  )
}
