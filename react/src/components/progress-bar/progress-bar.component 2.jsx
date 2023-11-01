import { useState, useEffect } from "react";
import './progress-bar.styles.scss'

const ProgressBar1 = ({ page, onNextPage }) => {
  const [progress, setProgress] = useState(2);


  const handleProgress = () => {
    setProgress(progress + 34);
  }
  // Simulate progress increase with a useEffect
  useEffect(() => {
  }, [progress]);

  return (
    <div className="progress-container">
      <div
        className="progress-bar"
        style={{ width: `${progress}%` }}
      ></div>

      <div class="sections">
        <div>Cart-Overview</div>
        <div>Delivery details</div>
        <div>Payment</div>
      </div>
      <br />
      {page < 3 && (
        <button className="next" onClick={() => {
          onNextPage();
          handleProgress();
        }}>
          Next
      </button>
      )}
    </div>
  )
}
export default ProgressBar1;