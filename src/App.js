import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="h-screen bg-slate-300">
      <Navbar />
      <SentimentalForm />
    </div>
  );
}

function SentimentalForm() {
  const [result, setResult] = useState("");
  const [time, setTime] = useState("1");
  const [text, setText] = useState("");

  async function submitSentiment(e) {
    e.preventDefault();
    let totalTime = time === "1" ? "morning" : time === "2" ? "noon" : "night";
    console.log(totalTime);
    const parameters = new URLSearchParams({
      time: totalTime,
      text: text,
    }).toString();

    const apiRouter = `https://sentimental-analysis-fastapi.onrender.com/GetSentimentValue?${parameters}`;
    setResult("Please Wait");
    try {
      const response = await fetch(apiRouter, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch the data");
      }

      const data = await response.json();

      setResult(data.prediction + " sentiment");
    } catch (error) {
      console.error("Error fetching sentiment value:", error);
    }
  }

  return (
    <div className="h-[90%] flex justify-center items-center">
      <form
        className="w-full md:w-[30%] h-4/6 bg-slate-100 shadow rounded max-w-screen-md p-5"
        onSubmit={(e) => submitSentiment(e)}
      >
        <div className="font-bold w-full flex justify-center text-xl font-mono">
          <h1 className="bg-[#09122C] w-5/6 px-4 text-white text-center rounded-xl shadow py-1">
            {" "}
            Please input the data here
          </h1>
        </div>
        <div className="mt-8 flex flex-col">
          <label className="font-bold text-2xl font-mono">Time:</label>
          <select
            className="w-1/2 mt-2 rounded py-1 px-1 border-2 border-black font-mono"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            <option value="1">morning</option>
            <option value="2">noon</option>
            <option value="3">night</option>
          </select>
        </div>
        <div className="mt-4 flex flex-col">
          <label className="font-bold text-2xl font-mono">
            Sentimental Text:
          </label>
          <textarea
            onChange={(e) => setText(e.target.value)}
            value={text}
            className="px-1 rounded border-black font-mono"
            rows="4"
          ></textarea>
        </div>
        <div className="mt-5 w-full flex flex-col">
          <button
            type="submit"
            className="bg-green-400 px-4 text-xl font-mono font-bold text-white rounded-full w-[30%] self-center"
          >
            Analyze
          </button>
        </div>
        <div className="mt-5">
          <h1 className="text-2xl font-bold font-mono mt-4 ">
            Results:{" "}
            {result && (
              <span
                className={`${
                  result === "positive sentiment"
                    ? "bg-green-800"
                    : result === "neutral sentiment"
                    ? "bg-sky-800"
                    : "bg-red-800"
                } px-4 text-white font-bold rounded shadow`}
              >
                {result}
              </span>
            )}
          </h1>
        </div>
      </form>
    </div>
  );
}

function Navbar() {
  return (
    <div className="h-[8%] shadow shadow-black rounded bg-[#09122C] w-full text-white font-bold text-2xl flex justify-center items-center">
      <div className="w-1/2 font-mono flex justify-center gap-2">
        <h1>Sentimental Analysis</h1>
        <div className="flex gap-1 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 36 36"
          >
            <path
              fill="#ffcc4d"
              d="M36 18c0 9.941-8.059 18-18 18c-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"
            />
            <path
              fill="#664500"
              d="M25.485 29.879C25.44 29.7 24.317 25.5 18 25.5s-7.44 4.2-7.485 4.379a.5.5 0 0 0 .237.554a.51.51 0 0 0 .6-.077c.019-.019 1.954-1.856 6.648-1.856s6.63 1.837 6.648 1.855a.5.5 0 0 0 .598.081a.5.5 0 0 0 .239-.557m-9.778-12.586C12.452 14.038 7.221 14 7 14a1.001 1.001 0 0 0-.001 2c.029 0 1.925.022 3.983.737c-.593.64-.982 1.634-.982 2.763c0 1.934 1.119 3.5 2.5 3.5s2.5-1.566 2.5-3.5c0-.174-.019-.34-.037-.507c.013 0 .025.007.037.007a.999.999 0 0 0 .707-1.707M29 14c-.221 0-5.451.038-8.707 3.293A.999.999 0 0 0 21 19c.013 0 .024-.007.036-.007c-.016.167-.036.333-.036.507c0 1.934 1.119 3.5 2.5 3.5s2.5-1.566 2.5-3.5c0-1.129-.389-2.123-.982-2.763A14 14 0 0 1 29.002 16A1 1 0 0 0 29 14"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 36 36"
          >
            <path
              fill="#f3d2a2"
              d="M6 20c0 2.209-1.119 4-2.5 4S1 22.209 1 20s1.119-4 2.5-4S6 17.791 6 20m29 0c0 2.209-1.119 4-2.5 4S30 22.209 30 20s1.119-4 2.5-4s2.5 1.791 2.5 4"
            />
            <path
              fill="#f3d2a2"
              d="M4 20.562c0-8.526 6.268-15.438 14-15.438s14 6.912 14 15.438S25.732 35 18 35S4 29.088 4 20.562"
            />
            <path
              fill="#662113"
              d="M12 22a1 1 0 0 1-1-1v-2a1 1 0 0 1 2 0v2a1 1 0 0 1-1 1m12 0a1 1 0 0 1-1-1v-2a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1"
            />
            <path
              fill="#c1694f"
              d="M18 30c-4.188 0-6.357-1.06-6.447-1.105a1 1 0 0 1 .89-1.791c.051.024 1.925.896 5.557.896c3.665 0 5.54-.888 5.559-.897a1.003 1.003 0 0 1 1.336.457a.997.997 0 0 1-.447 1.335C24.356 28.94 22.188 30 18 30m1-5h-2a1 1 0 1 1 0-2h2a1 1 0 1 1 0 2"
            />
            <path
              fill="#ffe51e"
              d="M18 .354C8.77.354 3 6.816 3 12.2s1.154 7.539 2.308 5.385l2.308-4.308s3.791-.124 6.099-2.278c0 0-1.071 4 6.594.124c0 0-.166 3.876 5.191-.124c0 0 4.039 1.201 5.191 6.586c.32 1.494 2.309 0 2.309-5.385S28.385.354 18 .354"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 36 36"
          >
            <path
              fill="#ffcc4d"
              d="M36 18c0 9.941-8.059 18-18 18c-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"
            />
            <ellipse cx="11.5" cy="16.5" fill="#664500" rx="2.5" ry="3.5" />
            <ellipse cx="24.5" cy="16.5" fill="#664500" rx="2.5" ry="3.5" />
            <path fill="#664500" d="M12 28c2-5 13-5 13-3c0 1-8-1-13 3" />
          </svg>
        </div>
      </div>
    </div>
  );
}
export default App;
