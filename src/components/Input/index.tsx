import { useState } from "react";
import "./TextFieldWithDropdown.css";

function getLabels(keyword: string) {
  const allLabels = ["NextActions", "Someday_Actions", "Costco", "Alexa"];
  const result = allLabels.filter(function (x) {
    return x.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
  });
  return result;
}

function getLabelsAsync(keyword: string) {
  const result = getLabels(keyword);
  const delay = Math.random() * 800 + 200; // delay 200~1000ms
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, delay, result);
  });
}

const InputTest: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [name, setName] = useState<string>("");
  const [data, setData] = useState<string[]>([]);

  const onChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);

    if (value.includes("@")) {
      const keyword = value.split("@").pop()?.trim() || "";
      const response = await getLabelsAsync(keyword);
      setData(response);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleDropdownSelect = (label: string) => {
    const startIndex = name.lastIndexOf("@");
    const updatedValue =
      name.substring(0, startIndex) +
      `@${label}` +
      name.substring(startIndex + label.length + 1);
    setName(updatedValue);
    setShowDropdown(false);
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={onChangeHandler}
        placeholder="Type @ for labels..."
      />
      {showDropdown && (
        <div>
          {data?.map((label, index) => (
            <div
              key={index}
              onClick={() => handleDropdownSelect(label)}
              className="dropdown-option"
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputTest;
