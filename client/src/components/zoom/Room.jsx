import React, { useEffect, useRef, useState } from 'react';
import { Button, Box } from '@mui/material';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';

const Video = (peer) => {
  const ref = useRef();

  useEffect(() => {
    peer.on('stream', (stream) => {
      ref.current.srcObject = stream;
    });
  }, [peer]);

  return <StyledVideo playsInline autoPlay ref={ref} />;
};

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

const Room = (props) => {
  const navigate = useNavigate();

  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  // Get the userId param from the URL.
  let { roomID } = useParams();

  useEffect(() => {
    socketRef.current = io('ws://localhost:8100');
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        socketRef.current.emit('join room', roomID);
        socketRef.current.on('all users', (users) => {
          const peers = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push(peer);
          });
          setPeers(peers);
        });

        socketRef.current.on('user joined', (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          setPeers((users) => [...users, peer]);
        });

        socketRef.current.on('receiving returned signal', (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      });
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socketRef.current.emit('sending signal', {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socketRef.current.emit('returning signal', { signal, callerID });
    });

    peer.signal(incomingSignal);

    peer.on('close', () => {
      setPeers(peers.filter((p) => p !== peer));
      peersRef.current = peersRef.current.filter((p) => p.peer !== peer);
    });

    return peer;
  }
  // https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/stop
  const stopStreamedVideo = () => {
    userVideo.current.srcObject.getTracks().forEach(function (track) {
      track.stop();
    });
    peers.forEach((p) => p.destroy());
    socketRef.current.disconnect();
    navigate('/dashboard');
    //socketRef.current.on("disconnect")
  };

  return (
    <>
      <Box
        sx={{
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 300,
        }}
      >
        <Button
          onClick={() => stopStreamedVideo()}
          color="primary"
          variant="contained"
          className="hero__createBTN"
        >
          <p>exit</p>
        </Button>
      </Box>

      <Container>
        <StyledVideo muted ref={userVideo} autoPlay playsInline />
        {peers.map((peer, index) => {
          return <Video key={index} peer={peer} />;
        })}
      </Container>
    </>
  );
};

export default Room;

const Container = styled.div`
  padding: 20px;
  display: flex;
  height: 100vh;
  width: 90%;
  margin: auto;
  flex-wrap: wrap;
`;

const StyledVideo = styled.video`
  height: 40%;
  width: 50%;
`;
