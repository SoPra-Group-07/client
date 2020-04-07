import React, { useState } from 'react';
import './toggleswitch.css';
import ToggleSwitch from "./ToggleSwitch";

function ToggleApp() {
  const [value, setValue] = useState(false);
  return (
    <div className="app">
      <ToggleSwitch
        isOn={value}
        handleToggle={() => setValue(!value)}
      />
    </div>
  );
}

<<<<<<< HEAD
export default ToggleApp;
=======
export default ToggleApp;
>>>>>>> testbranch
