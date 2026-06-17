interface BadgeProps {
  children: React.ReactNode;
  variant?: 'purple' | 'green' | 'gray';
}

export default function Badge({ children, variant = 'purple' }: BadgeProps) {
  const variants = {
    purple: "bg-purple-900/50 text-purple-300 border border-purple-800",
    green: "bg-green-900/50 text-green-300 border border-green-800",
    gray: "bg-gray-800 text-gray-300 border border-gray-700"
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}
