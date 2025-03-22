import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlayCircle, PauseCircle } from "lucide-react";
import Confetti from "react-confetti";

const gifs = [
  "/gif1.gif",
  "/gif2.gif",
  "/gif3.gif",
  "/gif4.gif",
];

const videoSources = [
  "/pop-video.mp4",
  "/rap-video.mp4",
  "/hip-hop-video.mp4",
];

const buttonLabels = ["Convert to Rap", "Convert to Hip-hop", "Convert to Pop"];

export default function BirthdayWish() {
  const [videoIndex, setVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [shapes, setShapes] = useState([]);

  const handleVideoChange = () => {
    setVideoIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
    setIsPlaying(false);
  };

  // Function to add a new shape at a random position
  const addShape = () => {
    setShapes((prevShapes) => [
      ...prevShapes,
      {
        id: Math.random(),
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 20 + 20, // Random size between 20px - 40px
      },
    ]);
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      setShowConfetti(true);
      interval = setInterval(() => {
        addShape();
      }, 1000);
    } else {
      setShowConfetti(false);
      setShapes([]); // Clear shapes when video stops
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 to-yellow-400 flex flex-col items-center justify-center p-6 text-white">
      {showConfetti && <Confetti numberOfPieces={200} recycle={false} gravity={0.3} />}
      <h1 className="text-5xl font-bold mb-4 animate-bounce">🎉 Happy Birthday Kanchan! 🎶</h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-6">
        {gifs.map((gif, index) => (
          <div key={index} className="w-40 h-40 bg-white rounded-xl overflow-hidden shadow-lg transform hover:scale-110 transition duration-300">
            <img src={gif} alt={`gif-${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <motion.div
        key={videoIndex}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-2xl"
      >
        <div className="relative">
          <video
            id="birthday-video"
            className="w-full rounded-xl shadow-2xl border-4 border-white"
            src={videoSources[videoIndex]}
          />
          <button
            onClick={() => {
              const video = document.getElementById("birthday-video");
              if (video.paused) {
                video.play();
                setIsPlaying(true);
              } else {
                video.pause();
                setIsPlaying(false);
              }
            }}
            className="absolute inset-0 flex items-center justify-center bg-transparent"
          >
            {isPlaying ? (
              <PauseCircle className="text-white w-16 h-16 animate-pulse" />
            ) : (
              <PlayCircle className="text-white w-16 h-16 animate-bounce" />
            )}
          </button>
        </div>
      </motion.div>

      {/* Animated Shapes */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, y: -100, scale: 1.2 }}
          exit={{ opacity: 0, y: -200 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="absolute bg-pink-400 rounded-full"
          style={{
            left: shape.left,
            top: shape.top,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
          }}
        ></motion.div>
      ))}

      <motion.button
        onClick={handleVideoChange}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-4 px-6 py-3 bg-white text-pink-500 font-semibold text-lg rounded-full transition-transform transform hover:scale-110 hover:bg-yellow-400 border-2 border-pink-500 shadow-[0_0_15px_5px_rgba(255,105,180,0.6),0_0_25px_15px_rgba(75,0,130,0.5)] hover:shadow-[0_0_25px_10px_rgba(255,105,180,0.9),0_0_35px_20px_rgba(75,0,130,0.6)] active:bg-red-500 active:text-amber-50  animate-fade"
      >
        {buttonLabels[videoIndex]}
      </motion.button>

      <p className="mt-6 text-lg font-semibold italic">✨ A little something to celebrate an amazing friend! ✨</p>
    </div>
  );
}
