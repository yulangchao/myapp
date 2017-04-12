import {Component, View, AfterViewChecked, ElementRef, ViewChild, OnInit} from 'angular2/core';
import {Angular2AutoScroll} from "angular2-auto-scroll/lib/angular2-auto-scroll.directive";
import {ChatService} from './chat.service';
import {Router} from 'angular2/router';
// We `import` `http` into our `ChatService` but we can only
// specify providers within our component
import {HTTP_PROVIDERS} from 'angular2/http';

// Import NgFor directive
import {NgFor} from 'angular2/common';


// Create metadata with the `@Component` decorator
@Component({
    // HTML tag for specifying this component
    selector: 'chat',
    // Let Angular 2 know about `Http` and `ChatService`
    providers: [...HTTP_PROVIDERS, ChatService],
    template: require('./chat.html'),
    directives: [Angular2AutoScroll]
})


export class Chat implements OnInit, AfterViewChecked{
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;

    private url = 'http://localhost:8080';
    private socket;
  // Initialize our `chatData.text` to an empty `string`
  chatData = {
    text: '',
    name: '',
    date: ''
  };

  private chats: Array<Chat> = [];
  private check_chat: number = 0;
  private submit_name: number= 0;
  constructor(private router: Router, public ChatService: ChatService) {
      console.log('Chat constructor go!');
      if (localStorage.getItem('token')) {
          console.log(JSON.parse(localStorage.getItem('token')));
          this.chatData.name = JSON.parse(localStorage.getItem('token')).local.name;
      } else {
          router.navigate(['Index']);
      }

      //this.chats = [];
      ChatService.getAll()
      // `Rxjs`; we subscribe to the response
          .subscribe((res) => {

              // Populate our `todo` array with the `response` data
              this.chats = res;
              // Reset `todo` input
              this.chatData.text = '';
          });
      // setInterval(() => {
      //     ChatService.getAll()
      //     // `Rxjs`; we subscribe to the response
      //         .subscribe((res) => {
      //
      //             // Populate our `todo` array with the `response` data
      //             this.chats = res;
      //             // Reset `todo` input
      //         });
      // }, 2000);
  }

    ngOnInit() {
        this.scrollToBottom();
    }

     ngAfterViewChecked() {
        if(this.chats.length > this.check_chat) {
            this.scrollToBottom();
            this.check_chat = this.chats.length;
        }
     }

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { }
    }

  createChat() {
      this.chatData.date = (new Date()).toString().split('G')[0];
      console.log(this.chatData);
      this.ChatService.createChat(this.chatData)
        .subscribe((res) => {
            console.log("6666");
            // Populate our `todo` array with the `response` data
            this.chats = res;
            // Reset `todo` input
            this.chatData.text = '';
        });
  }

  deleteChat(id) {

    this.ChatService.deleteChat(id)
      .subscribe((res) => {

          // Populate our `todo` array with the `response` data
          this.chats = res;
      });
  }

  refresh(){
      console.log("11111");
      this.ChatService.getAll()
          .subscribe((res) => {

              // Populate our `todo` array with the `response` data
              this.chats = res;
              // Reset `todo` input
              this.chatData.text = '';
      });
  }
}
