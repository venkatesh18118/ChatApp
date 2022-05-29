import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatroomService } from '../chatroom.service';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-videochat',
  templateUrl: './videochat.component.html',
  styleUrls: ['./videochat.component.css']
})
export class VideochatComponent implements OnInit {

  public peers = {};
  public myVideo: HTMLVideoElement;
  //UserId: { chatroom: any; user: any; message: String; name: String; };
  myPeer: any;
  constructor(private webSocket: WebSocketService, private chatRoom: ChatroomService, private route: Router) {
    this.peerConnection();
    //this.webSocket.videoCallUserJoining().subscribe(data => this.UserId = data);
    //this.videoGrid = document.getElementById('videoGrid')
    this.myVideo = document.createElement('video')
    this.myVideo.muted = true;
    this.sendingToOthers();
    this.streamPlay();
    this.socketListening();

  }

  ngOnInit(): void {
  }



  peerConnection() {
    this.myPeer = new Peer(this.chatRoom.loginId, {
      secure: true, 
      host: 'peerjs-videochat.herokuapp.com', 
      port: 443,
    })

    this.myPeer.on('open', id => {
      this.webSocket.videoCallJoining(id);
    })
  }

  sendingToOthers() {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(Stream => {
      this.addVideoStream(this.myVideo, Stream)

    })
  }

  removeVideoCallUser() {
    this.webSocket.userDisconnected().subscribe(
      userId => {
        const data = userId;
        if (this.peers[data]) {
          console.log(this.peers[data]);
          this.peers[data].close();
        }
        // this.route.navigate(['/dashboard']);
      });
  }

  streamPlay() {
    this.myPeer.on('call', async call => {
      let Stream = null;
      Stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })
      call.answer(Stream);
      const video = document.createElement('video');
      await call.on('stream', async userVideoStream => {
        await this.addVideoStream(video, userVideoStream);
      })
    })
  }

  socketListening() {
    this.webSocket.socket.on('user-connected', async id => {
      let Stream = null;
      Stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })
      console.log('In Socket')
      await this.connectToNewUser(id, Stream)
    })
  }

  async videoPlay(video) {
    await video.play();
  }

  async addVideoStream(video, stream: any) {
    video.srcObject = stream;
    await video.addEventListener('loadedmetadata', this.videoPlay.bind(this, video))
    const videoGrid = document.getElementById('videoGrid')
    await videoGrid.append(video);
  }



  async connectToNewUser(userId: any, Stream: any) {
    const call = await this.myPeer.call(userId, Stream);
    const video = document.createElement('video')
    await call.on('stream', async userVideoStream => {
      await this.addVideoStream(video, userVideoStream);
    })
    call.on('close', async () => {
      video.remove()
    })
    this.peers[userId] = call;
    console.log(this.peers[userId]);
  }


  async leaveCall() {
    await this.webSocket.leaveVideoCall();
    //this.route.navigate(['/dashboard']);
    await this.removeVideoCallUser()
  }
}
