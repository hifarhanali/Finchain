import { Switch } from "@material-tailwind/react";

const LabelSwitch = ({ onChange, isChecked = false, label = null }) => {
  return (
    <div className="flex items-center">
      <Switch
        color="amber"
        defaultChecked={isChecked}
        onChange={onChange}
        label={label}
        labelProps={{
          className: `${isChecked ? "text-gray-900" : "text-gray-500"}`,
        }}
      />
    </div>
  );
};

export default LabelSwitch;
