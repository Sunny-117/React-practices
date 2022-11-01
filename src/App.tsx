import { Accordion, AccordionItem } from "./components/Visual视觉效果渲染/Accordion"
import { Carousel } from "./components/Visual视觉效果渲染/Carousel/index copy"
import { Collapse } from "./components/Visual视觉效果渲染/Collapse"
import { CountDown } from "./components/Visual视觉效果渲染/CountDown"


export const App = () => {
  return (

    <div>
      <div id="Accordion" style={{
        margin: '100px'
      }}>
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
      <div id="Carousel" style={{
        margin: '100px'
      }}>
        <Carousel
          carouselItems={[
            <div>carousel item 1</div>,
            <div>carousel item 2</div>,
            <div>carousel item 3</div>
          ]}
        />
      </div>
      <hr />
      <div className="collapse" style={{
        margin: '100px'
      }}>
        <Collapse collapsed={false}>
          <h1>This is a collapse</h1>
          <p>Hello world!</p>
        </Collapse>
      </div>
      <hr />
      <div className="CountDown">
        <CountDown hours="0" minutes="0" seconds="2" />
      </div>
    </div>
  )
}
