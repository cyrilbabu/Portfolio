import { motion } from "framer-motion";

export default function BreathingBox({ text }) {
  return (
    // <motion.div
    //   animate={{
    //     scale: [1, 1.05, 1],
    //     opacity: [0.9, 1, 0.9],
    //   }}
    //   transition={{
    //     duration: 3,
    //     repeat: Infinity,
    //     ease: "easeInOut",
    //   }}
    //   style={{
    //     width: "200px",
    //     height: "200px",
    //     backgroundColor: "#3b82f6",
    //     borderRadius: "16px",
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    <motion.div
      animate={{ opacity: [0, 1, 0] }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        color: "white",
        fontWeight: "bold",
        fontSize: "1.25rem",
      }}
    >
      {text}
    </motion.div>
    // </motion.div>
  );
}

// import React, { useState } from "react";
// import { ReactMic } from "react-mic";

// export default function MicReactComponent() {
//   const [record, setRecord] = useState(false);

//   const onData = (recordedBlob) => {
//     // You can extract volume here if needed (e.g., via waveform peaks)
//     console.log("chunk of real-time data:", recordedBlob);
//   };

//   const onStop = (recordedBlob) => {
//     console.log("recordedBlob is:", recordedBlob);
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "40px" }}>
//       <ReactMic
//         record={record}
//         className="sound-wave"
//         onStop={onStop}
//         onData={onData}
//         strokeColor="#000000"
//         backgroundColor="#FF4081"
//       />
//       <div style={{ marginTop: "20px" }}>
//         <button onClick={() => setRecord(true)}>Start</button>
//         <button onClick={() => setRecord(false)}>Stop</button>
//       </div>
//     </div>
//   );
// }
