import { useState } from "react"
import { Accordion, AccordionItem } from "./components/Visual视觉效果渲染/Accordion"
import { Carousel } from "./components/Visual视觉效果渲染/Carousel/index copy"
import { Collapse } from "./components/Visual视觉效果渲染/Collapse"
import { CountDown } from "./components/Visual视觉效果渲染/CountDown"
import { FileDrop } from "./components/Visual视觉效果渲染/FileDrop"
import { Mailto } from "./components/Visual视觉效果渲染/Mailto"
import { Modal } from "./components/Visual视觉效果渲染/Modal"


export const App = () => {
  const [isModal, setModal] = useState(false);
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
      <div className="CountDown" style={{
        margin: '100px'
      }}>
        <CountDown hours="0" minutes="0" seconds="2" />
      </div>
      <hr />
      <div className="fileDrop" style={{
        margin: '100px'
      }}>
        <FileDrop handleDrop={console.log} />
      </div>
      <div draggable style={
        {
          width: '100px',
          height: '100px',
          background: 'red'
        }

      }></div>
      <div style={{
        width: '400px',
        height: '500px',
        border: '1px solid'
      }}
        onClick={(e) => {
          console.log(e, 'asmdlkam')
        }}
        onDragEnter={e => {
          e.preventDefault();
          e.stopPropagation();
          console.log('onDragEnter', e)
        }}
        onDragLeave={e => {
          console.log(e, 'onDragLeave')
          e.preventDefault();
          e.stopPropagation();
        }}
        onDragOver={e => {
          console.log(e, 'onDragOver')
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('onDrop', e.dataTransfer)
        }}
      >
        test
      </div>
      <div id="mailto" style={
        {
          width: '100px',
          height: '100px',
          background: 'red'
        }
      }>
        <Mailto email="foo@bar.baz" subject="Hello" body="Hello world!">
          Mail me!
        </Mailto>
      </div>
      <div id="modal">
        <button onClick={() => setModal(true)}>显示模态框</button>
        <Modal
          isVisible={isModal}
          title="标题"
          content={<p>正文</p>}
          footer={<button onClick={() => setModal(false)}>关闭模态框</button>}
          onClose={() => setModal(false)}
        />
      </div>
    </div>
  )
}
