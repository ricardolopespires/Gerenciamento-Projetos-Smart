import { io } from 'socket.io-client';

const socket = io('ws://localhost:8000'); // ajuste para seu backend

export default socket;
// Você pode adicionar eventos personalizados aqui, por exemplo:
// socket.on('connect', () => {     