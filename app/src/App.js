import React, { Component } from 'react';
import SockJS from 'sockjs-client';
import {getAllNotes, sendNote, deleteNote, updateNote} from './api/api';
import {Table, Card, Button, Input} from 'antd'
import "antd/dist/antd.css";
import "./App.css";

class App extends Component {
  state = {
    time: new Date().toLocaleTimeString(),
    serverTime: 'нет данных'
  }

  componentDidMount() {// выполнено монтирование компонента
    // создаем подключение к сокету
    this.sock = new SockJS('http://127.0.0.1:9999/echo');

    this.sock.onopen = function () {
      console.log('open');
      // при открытии пошлем на сервер сообщение
      this.send('socket opened');
    };
    // на событие onmessage навешиваем одноименную функцию
    this.sock.onmessage = this.onMessage.bind(this);
    this.sock.onclose = function () {
      console.log('close');
    };
    setInterval(this.tick, 1000);
    this.getAll();
  } 

  getAll = () => {
    getAllNotes()
    .then(res => {
            console.log(res)
    this.setState({
              data: res.data
            })
          })
    .catch(err => console.log(err));
  }

  addNote = (title, body) => {
    sendNote(title,body).then(res => {
      this.getAll()
    }).catch(err => console.log(err))
  }

  delNote = (id) => {
    deleteNote(id).then(res => {
      this.getAll()
    }).catch(err => console.log(err))
  }

  updNote = (id, title, body) => {
    updateNote(id, title, body).then(res => {
      this.getAll()
    }).catch(err => console.log(err))
  }

  //функция получает данные...
  onMessage = (e) => {
    if (e.data) {
      // и помещает их в state
      this.setState({
        serverTime: e.data
      })
    }
  }

  tick = () => {
    this.setState({
      time: new Date().toLocaleTimeString(),
    })
  }
  
  render() {
    console.log(this.state)
    const columns = [
      {
        title: '_id',
        dataIndex: '_id',
        key: '_id',
      },
      {
        title: 'title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'text',
        dataIndex: 'text',
        key: 'text',
      }
    ];

    return (
      <div class="container">
        <div class = "wrapper">
          <Card 
            title={'Basov Andrew'}
            actions={[
              <h1>Time: {this.state.time}</h1>, 
              <h1>Server time: {this.state.serverTime}</h1>
            ]}
          >
            <Table columns={columns} dataSource={this.state.data} />
            <div class="control_elements">
              <div class="elements input">
                <h1 class="column_title add_title">Add note</h1>
                <Input id="add_title" className="elem add_title" placeholder="title"></Input>
                <Input id="add_body" className="elem add_body" placeholder="body"></Input>
                <Button id="button_add" className="elem button add_b"
                  onClick={()=>{
                    let title = document.getElementById("add_title");
                    let body = document.getElementById("add_body");
                    this.addNote(title.value, body.value);
                  }
                }>Add row</Button>
              </div>
              <div class="elements update">
                <h1 class="column_title update_title">Update note</h1>
                <Input id="update_id" className="elem update_id" placeholder="id"></Input>
                <Input id="update_title" className="elem update_title" placeholder="title"></Input>
                <Input id="update_body" className="elem update_body" placeholder="body"></Input>
                <Button id="button_update" className="elem button update_b"
                    onClick={()=>{
                      let id = document.getElementById("update_id");
                      let title = document.getElementById("update_title");
                      let body = document.getElementById("update_body");
                      this.updNote(id.value, title.value, body.value);
                    }
                  }>Update row</Button>
              </div>
            </div>
            <div class = "elements delete">
              <h1 class="column_title delete_title">delete note</h1>
              <Input id="delete_id" className=" elem delete_id" placeholder="id"></Input>
              <Button id="button_delete" className="elem button delete_b"
                onClick={()=>{
                    let id = document.getElementById("delete_id");
                    this.delNote(id.value);
                  }
                }>Delete row</Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

export default App;