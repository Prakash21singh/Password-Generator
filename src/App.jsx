import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [Length, setLength] = useState(8);
  const [numAllowed, setnumAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*()_+{}<>";
    for (let i = 0; i < Length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [Length, numAllowed, characterAllowed, setPassword]);

  const copyCode = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  }, [password]);

  useEffect(() => {
    copyCode();
    passwordGenerator();
  }, [numAllowed, characterAllowed, length, passwordGenerator]);

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-gradient-to-br to-fuchsia-200 from-purple-600 flex-col">
        <h1 className="text-4xl font-semibold my-4">Password Generator</h1>
        <div className="w-10/12 lg:w-1/2 h-1/2 border-2 rounded-lg shadow-2xl flex justify-center items-center flex-col">
          <div className="top flex w-11/12 lg:w-4/5 justify-center items-center m-5 ">
            <input
              ref={passwordRef}
              value={password}
              type="text"
              readOnly
              className="p-3 w-4/5 rounded-s-lg text-black outline-none"
            />
            <button className="p-3 rounded-e-lg bg-pink-500" onClick={copyCode}>
              Copy
            </button>
          </div>
          <div className="top flex w-11/12 lg:w-4/5 justify-around items-center m-5 flex-col lg:flex-row p-5">
            <div className="flex justify-center items-center text-2xl m-5">
              <input
                type="range"
                id="range"
                className="mx-2"
                min={6}
                max={100}
                value={Length}
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label htmlFor="range">Length:{Length}</label>
            </div>
            <div className="text-2xl m-5">
              <input
                type="checkbox"
                id="number"
                onChange={() => setnumAllowed(!numAllowed)}
              />
              <label htmlFor="number">Number</label>
            </div>
            <div className="text-xl m-5 ">
              <input
                type="checkbox"
                id="Character"
                onChange={() => setCharacterAllowed(!characterAllowed)}
              />
              <label htmlFor="Character">Character</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
