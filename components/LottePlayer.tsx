import React from 'react'
import dynamic from "next/dynamic";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

const LottePlayer = ( props: { autoplay?: boolean ; loop?: boolean ; src: string; height?: string; width?: string } ) => {
  return (
      <Player
        autoplay={props.autoplay ?? true}
        loop={props.loop ?? true}
        src={props.src}
        style={{ height: props.height ?? "", width: props.width ?? "" }}
      />
  )
}

export default LottePlayer
