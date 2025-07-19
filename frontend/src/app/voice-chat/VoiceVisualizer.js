import { useRef, useEffect } from "react";

export default function VoiceVisualizer() {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 64; // Smaller size = fewer bars (more like your image)
      analyserRef.current = analyser;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      dataArrayRef.current = dataArray;

      source.connect(analyser);

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const draw = () => {
        analyser.getByteFrequencyData(dataArray);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const barWidth = canvas.width / bufferLength;
        const barHeightScale = canvas.height / 256;

        for (let i = 0; i < bufferLength; i++) {
          const value = dataArray[i];
          const barHeight = value * barHeightScale;

          const x = i * barWidth;
          const y = (canvas.height - barHeight) / 2;

          ctx.fillStyle = "#ffffff";
          ctx.fillRect(x, y, barWidth - 2, barHeight); // leave 2px gap for separation
        }

        animationFrameRef.current = requestAnimationFrame(draw);
      };

      draw();
    };

    init();

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={150}
      height={50}
      style={{
        borderRadius: "1px",
        display: "block",
      }}
    />
  );
}
