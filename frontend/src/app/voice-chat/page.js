"use client";
import {
  LiveKitRoom,
  RoomAudioRenderer,
  useLocalParticipant,
  useMaybeRoomContext,
} from "@livekit/components-react";
import { useEffect, useRef, useState } from "react";
import { RoomEvent } from "livekit-client";
import Image from "next/image";
import { IoMdMic } from "react-icons/io";
import { IoMdMicOff } from "react-icons/io";
import BreathingBox from "./Breathing";
import Screen_before_call from "./Screen_before_call";
import VoiceVisualizer from "./VoiceVisualizer";

function Transcriptions({ setHasConnected, setIsBotSpeaking, isBotSpeaking }) {
  const room = useMaybeRoomContext();
  const [transcriptions, setTranscriptions] = useState({});
  const scrollRef = useRef(null); // scroll container ref

  // Auto-hide bot speaking state after 500ms
  useEffect(() => {
    let timer;
    if (isBotSpeaking) {
      timer = setTimeout(() => {
        setIsBotSpeaking(false);
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [isBotSpeaking, setIsBotSpeaking]);

  // Update transcription segments
  useEffect(() => {
    if (!room) return;

    const updateTranscriptions = (segments, participant) => {
      setHasConnected(true);
      const identity = participant?.participantInfo.identity;

      setTranscriptions((prev) => {
        const newTranscriptions = { ...prev };
        for (const segment of segments) {
          newTranscriptions[segment.id] = {
            ...segment,
            send_by: identity,
          };
        }

        if (identity?.split("-")[0] === "agent") {
          setIsBotSpeaking(true);
        }

        return newTranscriptions;
      });
    };

    room.on(RoomEvent.TranscriptionReceived, updateTranscriptions);
    return () => {
      room.off(RoomEvent.TranscriptionReceived, updateTranscriptions);
    };
  }, [room, setHasConnected, setIsBotSpeaking]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcriptions]);

  return (
    <div className="w-full">
      <ul
        ref={scrollRef}
        className="p-2 max-h-[60vh] overflow-y-scroll space-y-2"
        style={{ scrollbarWidth: "none" }}
      >
        {Object.values(transcriptions)
          .sort((a, b) => a.firstReceivedTime - b.firstReceivedTime)
          .map((segment) => (
            <li key={segment.id}>
              <div
                className={`w-full flex space-x-2 ${
                  segment.send_by?.split("-")[0] === "agent"
                    ? "justify-start"
                    : "justify-end"
                }`}
              >
                <div className="w-10">
                  {segment.send_by?.split("-")[0] === "agent" && (
                    <div className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center">
                      <Image
                        src="/ai-cyril.png"
                        alt="Profile"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </div>
                  )}
                </div>

                <p
                  className={`py-1 px-2 border-2 rounded-lg ${
                    segment.send_by?.split("-")[0] === "agent"
                      ? "text-left mr-30 border-gray-300 bg-white/20"
                      : "text-right ml-30 bg-green-200 border-green-400"
                  }`}
                >
                  {segment.text}
                </p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

function Room({ setToken }) {
  const { localParticipant, isMicrophoneEnabled } = useLocalParticipant();
  const [hasConnected, setHasConnected] = useState(false);
  const [isBotSpeaking, setIsBotSpeaking] = useState(false);

  return (
    <>
      <div className="w-full">
        <div className="w-full flex justify-center">
          <div className="w-1/2 h-full flex flex-col items-center justify-center gap-4 border-r-2 border-white p-8">
            <RoomAudioRenderer />
            <div
              className={`rounded-full w-52 h-52 flex items-center justify-center transition-all duration-300 ${
                isBotSpeaking
                  ? "border-[20px] border-white/60 animate-pulse"
                  : "border-[8px] border-white/40 "
              }`}
            >
              <Image
                src="/ai-cyril.png"
                alt="Profile"
                width={300}
                height={300}
                className="rounded-full"
              />
            </div>
            <div>
              {hasConnected ? (
                isMicrophoneEnabled ? (
                  <VoiceVisualizer />
                ) : (
                  <p className="text-white font-semibold">Microphone is off</p>
                )
              ) : (
                <BreathingBox text="Connecting ..." />
              )}
            </div>
            <div className="flex gap-4 mt-4">
              <button
                className={`w-14 h-14 text-2xl rounded-full flex items-center justify-center transition-all ${
                  isMicrophoneEnabled ? "bg-white/20" : "bg-red-400"
                }`}
                onClick={() => {
                  localParticipant?.setMicrophoneEnabled(!isMicrophoneEnabled);
                }}
              >
                {isMicrophoneEnabled ? <IoMdMic /> : <IoMdMicOff />}
              </button>
            </div>
          </div>
          <div className="w-1/2  flex">
            <Transcriptions
              setHasConnected={setHasConnected}
              setIsBotSpeaking={setIsBotSpeaking}
              isBotSpeaking={isBotSpeaking}
            />
          </div>
        </div>
        <div className="flex justify-center mt-4 w-full bg-white/15 p-4 rounded-lg">
          <button
            className=" text-white bg-white/20 px-4 py-1 rounded"
            onClick={() => {
              setToken("");
            }}
          >
            End Conversation
          </button>
        </div>
      </div>
    </>
  );
}

export default function Home() {
  const [token, setToken] = useState("");
  const [url, setUrl] = useState("");

  return (
    <div className="p-8  h-screen bg-blue-950">
      <div className="flex w-full items-center justify-center border-2 bg-white/15  border-white rounded-lg p-4">
        {/* <Bars start={true} /> */}
        {token && url ? (
          <LiveKitRoom
            token={token}
            serverUrl={url}
            connectOptions={{ autoSubscribe: true }}
            className="w-full h-full"
          >
            <Room setToken={setToken} />
          </LiveKitRoom>
        ) : (
          <Screen_before_call setToken={setToken} setUrl={setUrl} />
        )}
      </div>
    </div>
  );
}
