interface CardProps {
  title: string;
  description?: string;
}

export default function Card({ title, description }: CardProps) {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-xl shadow-xl p-12 m-4">
      <h3 className="text-5xl font-bold mb-6">{title}</h3>
      {description && <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl text-center">{description}</p>}
    </div>
  );
}
