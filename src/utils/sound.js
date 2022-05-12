export default function soundPlay(event) {
  const sound = new Audio(`/${event}.wav`);
  sound.play();
}
