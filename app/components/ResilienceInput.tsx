'use client';

interface ResilienceInputProps {
  value: string;
  onChange: (value: string) => void;
  variant: 'textArea' | 'textInput';
  placeholder?: string;
}

export default function ResilienceInput({ 
  value, 
  onChange, 
  variant, 
  placeholder 
}: ResilienceInputProps) {
  const baseClasses = "w-full bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-200/70 focus:outline-none focus:ring-2 focus:ring-purple-accent focus:border-purple-accent transition-all duration-200";

  if (variant === 'textArea') {
    return (
      <div className="space-y-2">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={6}
          className={`${baseClasses} p-4 resize-none`}
        />
        <div className="flex justify-between text-sm text-purple-200/70">
          <span>{value.length} characters</span>
          <span>Minimum 50 characters recommended</span>
        </div>
      </div>
    );
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`${baseClasses} px-4 py-3`}
    />
  );
}
