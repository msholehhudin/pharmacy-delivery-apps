"use client";

type Props = {
  label: string;
  description: string;
  value: number;
  onChange: (val: number) => void;
  badgeColor?: string;
};

const FeeSliderCard = ({
  label,
  description,
  value,
  onChange,
  badgeColor,
}: Props) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-3">
      <span
        className={`text-xs px-2 py-1 rounded-full mb-2 inline-block ${badgeColor}`}
      >
        {label}
      </span>
      <p className="font-medium text-gray-900 dark:text-gray-100">
        {label} fee
      </p>
      <p className="text-xs text-gray-400 mb-4">{description}</p>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={0}
          max={100}
          step={0.5}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="flex-1 accent-blue-500"
        />
        <span className="text-xl font-medium w-16 text-right text-gray-900 dark:text-gray-100">
          {value.toFixed(1)}%
        </span>
      </div>
    </div>
  );
};

export default FeeSliderCard;
