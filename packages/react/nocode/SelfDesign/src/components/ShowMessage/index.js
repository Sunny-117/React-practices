import { createApp } from 'vue';
import ShowMessage from './ShowMessage.vue';

const render = (type,text) => {
  let messageNode = document.createElement('div');
  let attr = document.createAttribute('class');
  attr.value = 'message_box';
  messageNode.setAttributeNode(attr);

  const height = 60;
  const messageList = document.querySelectorAll('.message_box');
  messageNode.style.top = `${messageList.length * height}px`;

  const changeTop = () => {
    for (let i = 0; i < messageList.length; i++) {
      messageList[i].style.top = `${i * height}px`;
    }
  };

  const afterRemoveFun=()=>{
    app.unmount(messageNode);
    document.body.removeChild(messageNode);
    changeTop();
  };

  const app=createApp(ShowMessage,{type,text,afterRemoveFun});
  app.vm=app.mount(messageNode);
  document.body.appendChild(messageNode);
  return app;
};


export default {
  success(text = '') {
    return render('success', text);
  },
  warning(text = '') {
    return render('warning', text);
  },
  error(text = '') {
    return render('error', text);
  },
};