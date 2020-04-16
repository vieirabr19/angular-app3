import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app3';

  ngOnInit(): void{
    var firebaseConfig = {
      apiKey: "AIzaSyDG_mdvVd9UXjzQVvmqYCRMNKSIKlaVC94",
      authDomain: "jta-instragram-clone-14a71.firebaseapp.com",
      databaseURL: "https://jta-instragram-clone-14a71.firebaseio.com",
      projectId: "jta-instragram-clone-14a71",
      storageBucket: "jta-instragram-clone-14a71.appspot.com",
      messagingSenderId: "598610697251",
      appId: "1:598610697251:web:41f628e60b81ecd339e596"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  
  }
}
