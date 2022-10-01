import './App.css';
import {useState} from "react";
import axios from "axios";

const App = () => {
    const [result, setResult] = useState('');
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);

    const handleNum1 = (event) => {
        setNum1(event.target.value);
    }

    const handleNum2 = (event) => {
        setNum2(event.target.value);
    }

    const handleOpr = async (opr) => {
        await getCalcResult(opr)
    }

    const getCalcResult = async (opr) => {
        try {
            const response = await axios.get('calc', {params: {num1: num1, num2: num2, opr: opr}});
            const calcResult = response.data.message;
            setResult(`The result is ${calcResult}`);
        } catch (e) {
            if (e.response) {
                setResult(`oops ${e.response.data.message}`)
            }
        }
    }
    return (
        <div className="App">
            <header className="App-header">
                <label>
                    Number 1:
                </label>
                <input type='text' onChange={handleNum1} value={num1}/>
                <label>
                    Number 2:
                </label>
                <input type='text' onChange={handleNum2} value={num2}/>
                <div>
                    <button onClick={() => handleOpr('add')} style={{width: '75px'}}>+</button>
                    <button onClick={() => handleOpr('sub')} style={{width: '75px'}}>-</button>
                </div>
                <div>
                    {result}
                </div>

            </header>

        </div>
    );
}

export default App;
