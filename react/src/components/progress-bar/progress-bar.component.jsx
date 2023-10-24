import { useState, useEffect } from "react";
import './progress-bar.styles.scss'

const ProgressBar1 = () =>{
  const [progress, setProgress] = useState(0);

  const steps = [{
    label: 'step 1', value: 10
  }]

  const handleProgress = () =>{
    setProgress(progress + 33.33333);
  }
  // Simulate progress increase with a useEffect
  useEffect(() => {
  }, [progress]);

  return (
    <div className="progress-container">
      <div
        className="progress-bar"
        style={{ width: `${progress}%` }}
      >
        <div className="circle" />
      </div>
     

      Cart-Overview
      Delivery details
      Payment
      <br/>
      <button onClick={handleProgress}>
        Next
      </button>
    </div>
  )
}
export default ProgressBar1;